# backend/models/crud.py
from sqlalchemy.orm import Session, joinedload
from . import models

def get_personnel_by_keycloak_id(db: Session, keycloak_id: str):
    return db.query(models.Personnel).filter(models.Personnel.keycloak_id == keycloak_id).first()

def get_personnel_by_email(db: Session, email: str):
    return db.query(models.Personnel).filter(models.Personnel.email == email).first()

def create_personnel(db: Session, keycloak_id: str, email: str):
    db_personnel = models.Personnel(keycloak_id=keycloak_id, email=email, name=email)
    db.add(db_personnel)
    db.commit()
    db.refresh(db_personnel)
    return db_personnel

def get_or_create_personnel(db: Session, keycloak_id: str, email: str):
    # Try to find the user by their unique keycloak_id first
    user_by_keycloak_id = get_personnel_by_keycloak_id(db, keycloak_id)

    if user_by_keycloak_id:
        # If user is found, check if their email needs syncing
        if user_by_keycloak_id.email != email:
            # The email in Keycloak has changed. Check if another user exists with the new email.
            conflicting_user_by_email = get_personnel_by_email(db, email)
            if conflicting_user_by_email and conflicting_user_by_email.personnel_id != user_by_keycloak_id.personnel_id:
                # A conflicting account exists. We need to merge them.
                
                # 1. Re-assign any course history from the old account to the new one.
                db.query(models.PersonnelCourseHistory).filter(
                    models.PersonnelCourseHistory.personnel_id == conflicting_user_by_email.personnel_id
                ).update({"personnel_id": user_by_keycloak_id.personnel_id})

                # 2. Re-assign any appointment history from the old account to the new one.
                db.query(models.PersonnelTrackingAppointment).filter(
                    models.PersonnelTrackingAppointment.personnel_id == conflicting_user_by_email.personnel_id
                ).update({"personnel_id": user_by_keycloak_id.personnel_id})
                
                # You would add similar update statements here for other related tables
                # like achievements, rank history, etc., if necessary.

                # 3. Now it's safe to delete the conflicting user.
                db.delete(conflicting_user_by_email)
                db.commit()

            # 4. Update the email of the primary user record.
            user_by_keycloak_id.email = email
            db.commit()
            db.refresh(user_by_keycloak_id)
        return user_by_keycloak_id

    # If no user was found by keycloak_id, try to find them by email
    user_by_email = get_personnel_by_email(db, email)
    if user_by_email:
        # User found by email, but keycloak_id is missing. Let's link them.
        user_by_email.keycloak_id = keycloak_id
        db.commit()
        db.refresh(user_by_email)
        return user_by_email

    # If no user is found by either keycloak_id or email, create a new one
    return create_personnel(db, keycloak_id, email)


def get_user_roa_courses(db: Session, email: str):
    """
    Retrieves all ROA courses for a user identified by their email, regardless of completion status.
    """
    return (
        db.query(models.PersonnelCourseHistory)
        .join(models.Personnel, models.PersonnelCourseHistory.personnel_id == models.Personnel.personnel_id)
        .join(models.CourseModalitySchedule, models.PersonnelCourseHistory.schedule_id == models.CourseModalitySchedule.schedule_id)
        .join(models.Course, models.CourseModalitySchedule.course_id == models.Course.course_id)
        .join(models.Basket, models.Course.basket_id == models.Basket.basket_id)
        .join(models.CourseStatus, models.PersonnelCourseHistory.status_id == models.CourseStatus.status_id)
        .filter(models.Personnel.email == email)
        .filter(models.Basket.basket_name == 'ROA')
        .options(
            joinedload(models.PersonnelCourseHistory.schedule)
            .joinedload(models.CourseModalitySchedule.course)
            .joinedload(models.Course.supplier),
            joinedload(models.PersonnelCourseHistory.schedule)
            .joinedload(models.CourseModalitySchedule.course)
            .joinedload(models.Course.basket),
            joinedload(models.PersonnelCourseHistory.schedule)
            .joinedload(models.CourseModalitySchedule.course)
            .joinedload(models.Course.country),
            joinedload(models.PersonnelCourseHistory.schedule)
            .joinedload(models.CourseModalitySchedule.modality),
            joinedload(models.PersonnelCourseHistory.status)
        )
        .all()
    )