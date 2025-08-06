# backend/view/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# --- Base and Read Schemas for Lookup Tables ---

class RankBase(BaseModel):
    rank_name: str

class Rank(RankBase):
    rank_id: int
    class Config:
        from_attributes = True

class CourseStatusBase(BaseModel):
    status_name: str

class CourseStatus(CourseStatusBase):
    status_id: int
    class Config:
        from_attributes = True

class ModalityBase(BaseModel):
    modality_name: str

class Modality(ModalityBase):
    modality_id: int
    class Config:
        from_attributes = True

class BasketBase(BaseModel):
    basket_name: str

class Basket(BasketBase):
    basket_id: int
    class Config:
        from_attributes = True

class VocationBase(BaseModel):
    vocation_name: str

class Vocation(VocationBase):
    vocation_id: int
    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    appointment_name: str

class Appointment(AppointmentBase):
    appointment_id: int
    class Config:
        from_attributes = True

class SupplierBase(BaseModel):
    supplier_name: str

class Supplier(SupplierBase):
    supplier_id: int
    class Config:
        from_attributes = True

class CountryBase(BaseModel):
    country_name: str

class Country(CountryBase):
    country_id: int
    class Config:
        from_attributes = True

# --- Schemas for Core Data Tables ---

class CourseBase(BaseModel):
    course_title: str
    supplier_id: Optional[int] = None
    basket_id: Optional[int] = None
    country_id: Optional[int] = None

class Course(CourseBase):
    course_id: int
    supplier: Optional[Supplier] = None  # <-- CHANGED
    basket: Optional[Basket] = None      # <-- CHANGED
    country: Optional[Country] = None    # <-- CHANGED
    class Config:
        from_attributes = True

class PersonnelBase(BaseModel):
    name: str
    keycloak_id: Optional[str] = None
    email: Optional[str] = None
    current_rank_id: Optional[int] = None
    current_vocation_id: Optional[int] = None
    current_appointment_id: Optional[int] = None

class Personnel(PersonnelBase):
    personnel_id: int
    class Config:
        from_attributes = True

class CourseModalityScheduleBase(BaseModel):
    course_id: int
    modality_id: int
    course_available_start_date: date
    course_available_end_date: date

class CourseModalitySchedule(CourseModalityScheduleBase):
    schedule_id: int
    course: Course
    modality: Modality
    class Config:
        from_attributes = True

# --- Schemas for Tracking & History Tables ---

class PersonnelTrackingAchievementsBase(BaseModel):
    personnel_id: int
    achievements: str
    conferred_date: date

class PersonnelTrackingAchievements(PersonnelTrackingAchievementsBase):
    achievement_tracking_id: int
    class Config:
        from_attributes = True

class PersonnelTrackingAppointmentBase(BaseModel):
    personnel_id: int
    appointment_id: int
    conferred_date: date

class PersonnelTrackingAppointment(PersonnelTrackingAppointmentBase):
    appointment_tracking_id: int
    class Config:
        from_attributes = True

class PersonnelTrackingRankHistoryBase(BaseModel):
    personnel_id: int
    rank_id: int
    start_date: date
    end_date: Optional[date] = None

class PersonnelTrackingRankHistory(PersonnelTrackingRankHistoryBase):
    rank_history_id: int
    class Config:
        from_attributes = True

class PersonnelCourseHistoryBase(BaseModel):
    personnel_id: int
    schedule_id: int
    status_id: int
    completion_date: Optional[date] = None

class PersonnelCourseHistory(PersonnelCourseHistoryBase):
    enrollment_id: int
    schedule: CourseModalitySchedule
    status: CourseStatus
    class Config:
        from_attributes = True