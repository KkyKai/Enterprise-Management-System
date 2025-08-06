# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import models
from models.database import engine
from controller.api.routes import users as user_routes
# from authentication import main as auth_main
from authentication import main as auth_router 

# This line ensures that all tables are created in the database
# based on the models defined in models.py.
models.Base.metadata.create_all(bind=engine)

from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Enterprise Management System API",
    description="API for managing personnel and course data.",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# Mount the authentication app
# app.mount("/auth", auth_main.app)
app.include_router(
    auth_router.router, 
    prefix="/auth", 
    tags=["Authentication"]
)

# Include the user routes with a prefix
app.include_router(
    user_routes.router, 
    prefix="/api/users", 
    tags=["User Data"]
)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the EMS API"}