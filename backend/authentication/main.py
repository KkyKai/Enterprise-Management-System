# backend/authentication/main.py
from fastapi import Depends, FastAPI, HTTPException, status, Header, APIRouter
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta
import jwt
from .auth import settings 

# In authentication/main.py

from fastapi import Depends, FastAPI, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import timedelta
import jwt

# Import the entire auth module and the specific settings object
from . import auth
from .auth import settings 

from models import crud
from models import models
from models.database import SessionLocal

# app = FastAPI()
router = APIRouter() 

# This scheme is used to protect our OWN endpoints.
# It expects a JWT issued by our backend.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- PUBLIC LOGIN ENDPOINT ---
@router.post("/login", summary="Login with Keycloak token to get a backend session token")
def login(
    authorization: str | None = Header(None, description="Keycloak Access Token"),
    db: Session = Depends(get_db)
):
    """
    1. Receives a Keycloak token in the Authorization header.
    2. Validates the Keycloak token (signature, expiration, claims).
    3. Gets or creates a user record in the local database.
    4. Issues a NEW, backend-specific JWT to the client.
    """
    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing"
        )
    
    try:
        scheme, keycloak_token = authorization.split()
        if scheme.lower() != 'bearer':
            raise ValueError
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header format. Must be 'Bearer <token>'."
        )

    # Verify the external Keycloak token
    keycloak_payload = auth.verify_keycloak_token(keycloak_token)
    email = keycloak_payload.get("email")
    keycloak_id = keycloak_payload.get("sub")

    if not email or not keycloak_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Keycloak token is missing required 'email' or 'sub' claims.",
        )

    # Get or create the user in our database
    personnel = crud.get_or_create_personnel(db, keycloak_id=keycloak_id, email=email)

    # Create a new access token for OUR backend
    access_token_expires = timedelta(minutes=settings.BACKEND_ACCESS_TOKEN_EXPIRE_MINUTES)
    backend_access_token = auth.create_access_token(
        data={"sub": personnel.keycloak_id}, expires_delta=access_token_expires
    )

    return {"access_token": backend_access_token, "token_type": "bearer"}


# --- EXAMPLE SECURE ENDPOINT ---
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.Personnel:
    """
    Dependency to get the current user from the backend's JWT.
    This function is used to protect API endpoints.
    """
    try:
        payload = jwt.decode(
            token, settings.BACKEND_SECRET_KEY, algorithms=[settings.BACKEND_ALGORITHM]
        )
        keycloak_id: str = payload.get("sub")
        if keycloak_id is None:
            raise auth.CREDENTIALS_EXCEPTION
    except jwt.PyJWTError:
        raise auth.CREDENTIALS_EXCEPTION

    user = crud.get_personnel_by_keycloak_id(db, keycloak_id=keycloak_id)
    if user is None:
        raise auth.CREDENTIALS_EXCEPTION
    return user


@router.get("/users/me", summary="Get current user's details (Protected Route)")
def read_users_me(current_user: models.Personnel = Depends(get_current_user)):
    """
    A protected endpoint that returns the details of the user
    identified by the backend-issued JWT.
    """
    return current_user