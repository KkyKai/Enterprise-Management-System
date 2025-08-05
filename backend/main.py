# main.py
# uvicorn backend.main:app --reload
import logging

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .app import crud
from .app import schemas
from .app.database import database

# Configure the logger to write to a file named 'app.log'
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("FastAPI_log.txt"),
        #logging.StreamHandler() # Also log to console
    ]
)
logger = logging.getLogger(__name__)



# Application Setup
app = FastAPI(
    title="Personnel Management API",
    description="A RESTful API to manage personnel data, including career and course history.",
    version="1.0.0",
)

# ======== CORS Configuration ========
# List of origins that are allowed to make requests.
# Use ["*"] to allow all origins (less secure).
# For production, you should restrict this to your actual frontend domain.
origins = [
    "http://localhost:3000", # Your Next.js frontend
    "http://localhost:3001", # Another potential frontend port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# ======== End CORS Configuration ========

@app.exception_handler(Exception)
async def uncaught_exception_handler(request: Request, exc: Exception):
    """
    This middleware catches any unhandled exception and logs the traceback.
    It returns a generic 500 error to the client.
    """
    # Log the full traceback
    logger.error(f"Uncaught exception for request {request.method} {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred."},
    )

# Database connection events
@app.on_event("startup")
async def startup():
    await database.connect()
    logger.info("Application startup complete. Database connection established.")

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
    logger.info("Application shutdown complete. Database connection closed.")

# Root endpoint
@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Welcome to the Personnel Management API. See /docs for documentation."}

@app.get("/error", tags=["Testing"], summary="Trigger a server error")
async def trigger_error():
    """
    This endpoint deliberately raises a ZeroDivisionError to test
    the custom exception handler and logging.
    """
    result = 1 / 0
    return {"result": result} # This line will never be reached

# ===============================================
# RESTful Endpoints for Personnel Resource
# ===============================================
@app.get(
    "/personnel/{personnel_id}/details",
    response_model=schemas.UserDetails,
    tags=["Personnel"],
    summary="Get User Details",
    description="Retrieves the current rank, vocation, and appointment for a specific person.",
)
async def get_user_details(personnel_id: int):
    """
    This endpoint provides a concise summary of a single user's current status.
    It follows the REST principle of addressing a specific resource
    (`/personnel/{personnel_id}`) and providing a specific representation (`/details`).
    """
    user_details = await crud.get_user_details(personnel_id)
    if not user_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Personnel with ID {personnel_id} not found.",
        )
    return user_details

@app.get(
    "/personnel/{personnel_id}/roa",
    response_model=schemas.RoadOfAdvancement,
    tags=["Personnel"],
    summary="Get Road of Advancement",
    description="🛣️ Retrieves the full career history, including ranks, appointments, and achievements.",
)
async def get_road_of_advancement(personnel_id: int):
    """
    The Road of Advancement (ROA) is a composite view of a user's career.
    This endpoint aggregates multiple historical tracking tables into a single,
    meaningful response.
    """
    # First, check if the personnel exists to provide a clear 404 error
    if not await crud.get_user_details(personnel_id):
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Personnel with ID {personnel_id} not found.",
        )
    
    roa_data = await crud.get_road_of_advancement(personnel_id)
    return roa_data

@app.get(
    "/personnel/{personnel_id}/pdc",
    response_model=List[schemas.PersonalDevelopmentCourse],
    tags=["Personnel"],
    summary="Get Personal Development Courses",
    description="Retrieves the entire course history for a specific person.",
)
async def get_personal_development_courses(personnel_id: int):
    """
    This endpoint retrieves a list of all personal development courses
    a user has been enrolled in, including their status and completion details.
    """
     # First, check if the personnel exists
    if not await crud.get_user_details(personnel_id):
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Personnel with ID {personnel_id} not found.",
        )

    courses = await crud.get_personal_development_courses(personnel_id)
    return courses


# ===============================================
# Redirects for original endpoint names
# ===============================================
# These are included to match your original request, but they redirect
# to the more RESTful-structured endpoints.
@app.get("/userdetails/{personnel_id}", tags=["Redirects"], include_in_schema=False)
async def redirect_userdetails(personnel_id: int):
    return RedirectResponse(url=f"/personnel/{personnel_id}/details")

@app.get("/roa/{personnel_id}", tags=["Redirects"], include_in_schema=False)
async def redirect_roa(personnel_id: int):
    return RedirectResponse(url=f"/personnel/{personnel_id}/roa")

@app.get("/pdc/{personnel_id}", tags=["Redirects"], include_in_schema=False)
async def redirect_pdc(personnel_id: int):
    return RedirectResponse(url=f"/personnel/{personnel_id}/pdc")