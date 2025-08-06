# backend/controller/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import crud
from view import schemas
from models.database import SessionLocal
from authentication.main import get_current_user

# Dependency to get a database session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new router for user-related endpoints
router = APIRouter()

@router.get(
    "/courses/completed/roa/",
    response_model=List[schemas.PersonnelCourseHistory],
    tags=["Users"]
)
def read_my_completed_roa_courses(
    db: Session = Depends(get_db),
    current_user: schemas.Personnel = Depends(get_current_user)
):
    """
    Retrieves a detailed history of all completed ROA courses for the
    currently authenticated user.

    - **Authentication**: Requires a valid Keycloak JWT in the Authorization header.
    - **Returns**: A list of `PersonnelCourseHistory` objects.
    """
    # The user's identity is taken from the validated token
    course_history = crud.get_user_roa_courses(db, email=current_user.email)
    if not course_history:
        raise HTTPException(
            status_code=404,
            detail="No completed ROA courses found for this user."
        )
    return course_history