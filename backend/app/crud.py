# crud.py
from sqlalchemy import select
from .database import database
from . import models

async def get_user_details(personnel_id: int):
    """Fetches a single user's current details."""
    query = (
        select(
            models.Personnel.c.personnel_id,
            models.Personnel.c.name,
            models.Ranks.c.rank_name.label("current_rank"),
            models.Vocations.c.vocation_name.label("current_vocation"),
            models.Appointments.c.appointment_name.label("current_appointment"),
        )
        .select_from(models.Personnel)
        .join(models.Ranks, models.Personnel.c.current_rank_id == models.Ranks.c.rank_id)
        .join(models.Vocations, models.Personnel.c.current_vocation_id == models.Vocations.c.vocation_id)
        .join(models.Appointments, models.Personnel.c.current_appointment_id == models.Appointments.c.appointment_id)
        .where(models.Personnel.c.personnel_id == personnel_id)
    )
    return await database.fetch_one(query)

async def get_road_of_advancement(personnel_id: int):
    """Fetches all historical data for a user's career progression."""
    # Query for rank history
    rank_query = (
        select(models.Ranks.c.rank_name, models.Personnel_Tracking_Rank_History.c.start_date, models.Personnel_Tracking_Rank_History.c.end_date)
        .join(models.Ranks, models.Personnel_Tracking_Rank_History.c.rank_id == models.Ranks.c.rank_id)
        .where(models.Personnel_Tracking_Rank_History.c.personnel_id == personnel_id)
        .order_by(models.Personnel_Tracking_Rank_History.c.start_date.desc())
    )
    # Query for appointment history
    appt_query = (
        select(models.Appointments.c.appointment_name, models.Personnel_Tracking_Appointment.c.conferred_date)
        .join(models.Appointments, models.Personnel_Tracking_Appointment.c.appointment_id == models.Appointments.c.appointment_id)
        .where(models.Personnel_Tracking_Appointment.c.personnel_id == personnel_id)
        .order_by(models.Personnel_Tracking_Appointment.c.conferred_date.desc())
    )
    # Query for achievements
    achieve_query = (
        select(models.Personnel_Tracking_Achievements.c.achievements, models.Personnel_Tracking_Achievements.c.conferred_date)
        .where(models.Personnel_Tracking_Achievements.c.personnel_id == personnel_id)
        .order_by(models.Personnel_Tracking_Achievements.c.conferred_date.desc())
    )
    # Execute all queries concurrently
    rank_history = await database.fetch_all(rank_query)
    appointment_history = await database.fetch_all(appt_query)
    achievements = await database.fetch_all(achieve_query)

    return {
        "rank_history": rank_history,
        "appointment_history": appointment_history,
        "achievements": achievements,
    }

async def get_personal_development_courses(personnel_id: int):
    """Fetches the course history for a specific user."""
    # This is a complex join across multiple tables to get all descriptive names
    query = (
        select(
            models.Course.c.course_title,
            models.Suppliers.c.supplier_name,
            models.Course_Statuses.c.status_name,
            models.Modality.c.modality_name,
            models.Personnel_Course_History.c.completion_date,
        )
        .select_from(models.Personnel_Course_History)
        .join(models.Course_Statuses, models.Personnel_Course_History.c.status_id == models.Course_Statuses.c.status_id)
        .join(models.Course_Modality_Schedule, models.Personnel_Course_History.c.schedule_id == models.Course_Modality_Schedule.c.schedule_id)
        .join(models.Course, models.Course_Modality_Schedule.c.course_id == models.Course.c.course_id)
        .join(models.Suppliers, models.Course.c.supplier_id == models.Suppliers.c.supplier_id)
        .join(models.Modality, models.Course_Modality_Schedule.c.modality_id == models.Modality.c.modality_id)
        .where(models.Personnel_Course_History.c.personnel_id == personnel_id)
        .order_by(models.Personnel_Course_History.c.completion_date.desc().nulls_last())
    )
    return await database.fetch_all(query)