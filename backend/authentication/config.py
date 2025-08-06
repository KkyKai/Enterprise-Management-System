# backend/app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Project settings
    PROJECT_NAME: str = "Enterprise Management System"
    PROJECT_VERSION: str = "1.0.0"

    # Database settings
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "user")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "ems")
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

    # Keycloak settings
    KEYCLOAK_URL: str = os.getenv("KEYCLOAK_URL", "http://localhost:9800/")
    KEYCLOAK_CLIENT_ID: str = os.getenv("KEYCLOAK_CLIENT_ID", "fastapi-client")
    KEYCLOAK_REALM: str = os.getenv("KEYCLOAK_REALM", "FastAPI-Realm")
    KEYCLOAK_CLIENT_SECRET_KEY: str = os.getenv("KEYCLOAK_CLIENT_SECRET", "your_client_secret")
    
    @property
    def keycloak_jwks_url(self) -> str:
        return f"{self.KEYCLOAK_URL}realms/{self.KEYCLOAK_REALM}/protocol/openid-connect/certs"

    # The required issuer claim in the Keycloak token
    @property
    def keycloak_issuer(self) -> str:
        return f"{self.KEYCLOAK_URL}realms/{self.KEYCLOAK_REALM}"

    # JWT settings
    ALGORITHM: str = "RS256"
    # The audience for the JWT. This must match the client ID of the frontend application that is sending the token.
    # Set this in your environment variables to your Next.js frontend's Keycloak client ID.
    API_AUDIENCE: str = os.getenv("API_AUDIENCE", "your-frontend-client-id")


settings = Settings()