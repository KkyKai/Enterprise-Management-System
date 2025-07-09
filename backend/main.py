# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware

# --- Database Setup ---
DATABASE_URL="postgresql://postgres:root@localhost:5432/public"
engine = create_engine(
    DATABASE_URL,  # or your actual DB name
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
# In a production environment, fetch the public key from Keycloak's JWKS endpoint
KEYCLOAK_PUBLIC_KEY = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApjQrvy6+CtfA9f63Wl5F0aWFZdlZwQf0WcsCE1kxt3LGbs/Dp3Ip9e80ggfSFL+x0rW5ui9iLAXW+PSPzkWCSOxz9+/X8crLn/xIfg4mDqtnpbG2622kkN0fFzaPfOWl+YNt9So17GJJprrkOcz02vOaD3ePMvOGTIGHj1O2Ro5HIXSlfX1R1NYxu0eMxm599CAo06U3UzvKZofwz/h0aZsOprVtItgMArBv/2mvzQpBiMmfIarmfs05nPPqeZ5BiGxOvSYbWO8sRlUR/ArRXcCX9j/cglAohVGgthBJ16VxbWAZ8XCzhUfr0CmywHgYC8ncJr54wJW9ijql5C43WQIDAQAB
-----END PUBLIC KEY-----
"""


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Token(BaseModel):
    token: str

@app.post("/auth/keycloak-login")
def keycloak_login(token_data: Token, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(
            token_data.token,
            KEYCLOAK_PUBLIC_KEY,
            algorithms=KEYCLOAK_ALGORITHMS,
            options={"verify_signature": True, "verify_aud": False, "exp": True},
            issuer=KEYCLOAK_ISSUER
        )
        email: str = payload.get("email")
        keycloak_id: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        user = User(email=email, keycloak_id=keycloak_id)
        db.add(user)
        db.commit()
        db.refresh(user)
    elif user.keycloak_id is None:
        user.keycloak_id = keycloak_id
        db.commit()

    # You would typically issue your own JWT here for the FastAPI backend
    # For simplicity, we are returning a success message.
    return {"message": "User authenticated and mapped successfully", "user_id": user.id}