# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

# Import the function to get the public key dynamically
from .auth import get_keycloak_public_key

# --- Database Setup ---
DATABASE_URL="postgresql://postgres:root@localhost:5432/public"
engine = create_engine(
    DATABASE_URL,
    connect_args={"options": "-csearch_path=public"}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'schema': 'public'}
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    keycloak_id = Column(String, unique=True, index=True, nullable=True)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Keycloak Configuration ---
KEYCLOAK_ISSUER = "http://localhost:9800/realms/ems"
KEYCLOAK_ALGORITHMS = ["RS256"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Token(BaseModel):
    token: str
    access_token: str

@app.post("/auth/keycloak-login")
def keycloak_login(token_data: Token, db: Session = Depends(get_db)):
    try:
        public_key = get_keycloak_public_key()

        # Decode the token, providing the access_token for validation
        payload = jwt.decode(
            token_data.token,
            public_key,
            algorithms=KEYCLOAK_ALGORITHMS,
            audience="ems-frontend",
            issuer=KEYCLOAK_ISSUER,
            access_token=token_data.access_token
        )
        email: str = payload.get("email")
        keycloak_id: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials, email is missing",
            )
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {e}",
        )

    # If token is valid, find or create the user
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        user = User(email=email, keycloak_id=keycloak_id)
        db.add(user)
        db.commit()
        db.refresh(user)
    elif user.keycloak_id is None:
        user.keycloak_id = keycloak_id
        db.commit()

    return {"message": "User authenticated and mapped successfully", "user_id": user.id}
