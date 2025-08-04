# schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# ======== User Details Endpoint ========
class UserDetails(BaseModel):
    personnel_id: int
    name: str
    current_rank: str
    current_vocation: str
    current_appointment: str

    class Config:
        orm_mode = True # In Pydantic v2, use from_attributes = True

# ======== Road of Advancement (ROA) Endpoint ========
class RankHistoryItem(BaseModel):
    rank_name: str
    start_date: date
    end_date: Optional[date] = None

class AppointmentHistoryItem(BaseModel):
    appointment_name: str
    conferred_date: date

class AchievementItem(BaseModel):
    achievements: str
    conferred_date: date

class RoadOfAdvancement(BaseModel):
    rank_history: List[RankHistoryItem]
    appointment_history: List[AppointmentHistoryItem]
    achievements: List[AchievementItem]

# ======== Personal Development Course (PDC) Endpoint ========
class PersonalDevelopmentCourse(BaseModel):
    course_title: str
    supplier_name: str
    status_name: str
    modality_name: str
    completion_date: Optional[date] = None

    class Config:
        orm_mode = True