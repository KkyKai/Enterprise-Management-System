# backend/models/models.py
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text, Table, ForeignKeyConstraint
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

# Junction table for the many-to-many relationship between Course and Modality
course_modality_junction = Table('course_modality_junction', Base.metadata,
    Column('course_id', Integer, ForeignKey('course.course_id'), primary_key=True),
    Column('modality_id', Integer, ForeignKey('modality.modality_id'), primary_key=True)
)

class Personnel(Base):
    __tablename__ = 'personnel'
    personnel_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    keycloak_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    current_rank_id = Column(Integer, ForeignKey('ranks.rank_id'))
    current_vocation_id = Column(Integer, ForeignKey('vocations.vocation_id'))
    current_appointment_id = Column(Integer, ForeignKey('appointments.appointment_id'))

    # Relationships
    course_history = relationship("PersonnelCourseHistory", back_populates="personnel")
    rank_history = relationship("PersonnelTrackingRankHistory", back_populates="personnel")
    appointment_history = relationship("PersonnelTrackingAppointment", back_populates="personnel")
    achievements = relationship("PersonnelTrackingAchievements", back_populates="personnel")
    
    rank = relationship("Rank")
    vocation = relationship("Vocation")
    appointment = relationship("Appointment")

class Course(Base):
    __tablename__ = 'course'
    course_id = Column(Integer, primary_key=True, index=True)
    course_title = Column(String)
    supplier_id = Column(Integer, ForeignKey('suppliers.supplier_id'))
    basket_id = Column(Integer, ForeignKey('baskets.basket_id'))
    country_id = Column(Integer, ForeignKey('countries.country_id'))

    # Relationships
    schedules = relationship(
        "CourseModalitySchedule",
        primaryjoin="Course.course_id == foreign(CourseModalitySchedule.course_id)",
        back_populates="course"
    )
    modalities = relationship("Modality", secondary=course_modality_junction, back_populates="courses")
    
    supplier = relationship("Supplier")
    basket = relationship("Basket")
    country = relationship("Country")

class CourseStatus(Base):
    __tablename__ = 'course_statuses'
    status_id = Column(Integer, primary_key=True, index=True)
    status_name = Column(String, unique=True)

class CourseModalitySchedule(Base):
    __tablename__ = 'course_modality_schedule'
    schedule_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, nullable=False)
    modality_id = Column(Integer, nullable=False)
    course_available_start_date = Column(Date)
    course_available_end_date = Column(Date)

    __table_args__ = (
        ForeignKeyConstraint(
            ['course_id', 'modality_id'],
            ['course_modality_junction.course_id', 'course_modality_junction.modality_id']
        ),
    )

    # Relationships
    course = relationship(
        "Course",
        primaryjoin="foreign(CourseModalitySchedule.course_id) == Course.course_id",
        back_populates="schedules"
    )
    modality = relationship(
        "Modality",
        primaryjoin="foreign(CourseModalitySchedule.modality_id) == Modality.modality_id"
    )


class PersonnelCourseHistory(Base):
    __tablename__ = 'personnel_course_history'
    enrollment_id = Column(Integer, primary_key=True, index=True)
    personnel_id = Column(Integer, ForeignKey('personnel.personnel_id'))
    schedule_id = Column(Integer, ForeignKey('course_modality_schedule.schedule_id'))
    status_id = Column(Integer, ForeignKey('course_statuses.status_id'))
    completion_date = Column(Date)

    # Relationships
    personnel = relationship("Personnel", back_populates="course_history")
    schedule = relationship("CourseModalitySchedule")
    status = relationship("CourseStatus")

# --- Tracking Tables ---

class PersonnelTrackingAchievements(Base):
    __tablename__ = 'personnel_tracking_achievements'
    achievement_tracking_id = Column(Integer, primary_key=True, index=True)
    personnel_id = Column(Integer, ForeignKey('personnel.personnel_id'))
    achievements = Column(Text)
    conferred_date = Column(Date)
    
    personnel = relationship("Personnel", back_populates="achievements")

class PersonnelTrackingAppointment(Base):
    __tablename__ = 'personnel_tracking_appointment'
    appointment_tracking_id = Column(Integer, primary_key=True, index=True)
    personnel_id = Column(Integer, ForeignKey('personnel.personnel_id'))
    appointment_id = Column(Integer, ForeignKey('appointments.appointment_id'))
    conferred_date = Column(Date)

    personnel = relationship("Personnel", back_populates="appointment_history")
    appointment = relationship("Appointment")

class PersonnelTrackingRankHistory(Base):
    __tablename__ = 'personnel_tracking_rank_history'
    rank_history_id = Column(Integer, primary_key=True, index=True)
    personnel_id = Column(Integer, ForeignKey('personnel.personnel_id'))
    rank_id = Column(Integer, ForeignKey('ranks.rank_id'))
    start_date = Column(Date)
    end_date = Column(Date)

    personnel = relationship("Personnel", back_populates="rank_history")
    rank = relationship("Rank")

# --- Lookup Tables ---

class Rank(Base):
    __tablename__ = 'ranks'
    rank_id = Column(Integer, primary_key=True, index=True)
    rank_name = Column(String, unique=True)

class Modality(Base):
    __tablename__ = 'modality'
    modality_id = Column(Integer, primary_key=True, index=True)
    modality_name = Column(String, unique=True)
    courses = relationship("Course", secondary=course_modality_junction, back_populates="modalities")

class Basket(Base):
    __tablename__ = 'baskets'
    basket_id = Column(Integer, primary_key=True, index=True)
    basket_name = Column(String, unique=True)

class Vocation(Base):
    __tablename__ = 'vocations'
    vocation_id = Column(Integer, primary_key=True, index=True)
    vocation_name = Column(String, unique=True)

class Appointment(Base):
    __tablename__ = 'appointments'
    appointment_id = Column(Integer, primary_key=True, index=True)
    appointment_name = Column(String, unique=True)

class Supplier(Base):
    __tablename__ = 'suppliers'
    supplier_id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String, unique=True)

class Country(Base):
    __tablename__ = 'countries'
    country_id = Column(Integer, primary_key=True, index=True)
    country_name = Column(String, unique=True)