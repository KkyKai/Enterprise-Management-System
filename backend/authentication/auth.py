import os
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakError
from jose import jwt
from jose.exceptions import JWTError

# Load settings from config
class Settings:
    # Backend's own JWT settings
    BACKEND_SECRET_KEY: str = os.getenv("BACKEND_SECRET_KEY", "secret_key")
    BACKEND_ALGORITHM: str = os.getenv("BACKEND_ALGORITHM", "HS256")
    BACKEND_ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("BACKEND_ACCESS_TOKEN_EXPIRE_MINUTES", 30))

    # Keycloak settings for validation
    keycloak_server_url: str = os.getenv("KEYCLOAK_URL", "http://localhost:9800/").rstrip('/')
    keycloak_client_id: str = os.getenv("KEYCLOAK_CLIENT_ID", "ems-backend")
    keycloak_realm_name: str = os.getenv("KEYCLOAK_REALM", "ems")
    keycloak_client_secret: str = os.getenv("KEYCLOAK_CLIENT_SECRET", "your-client-secret")
    keycloak_issuer: str = f"{keycloak_server_url}/realms/{keycloak_realm_name}"

settings = Settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Define a reusable exception for credential errors
CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

# --- Backend Token Creation ---
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Creates a new JWT for our backend services."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.BACKEND_SECRET_KEY, algorithm=settings.BACKEND_ALGORITHM
    )
    return encoded_jwt

# --- Keycloak Token Verification ---
class KeycloakAuth:
    def __init__(self):
        self.keycloak_openid = KeycloakOpenID(
            server_url=settings.keycloak_server_url,
            client_id=settings.keycloak_client_id,
            realm_name=settings.keycloak_realm_name,
            client_secret_key=settings.keycloak_client_secret,
            verify=True,
        )

    def get_public_key(self):
        try:
            return (
                "-----BEGIN PUBLIC KEY-----\n"
                + self.keycloak_openid.public_key()
                + "\n-----END PUBLIC KEY-----"
            )
        except KeycloakError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Could not fetch public key: {e}",
            )

    def decode_token(self, token: str):
        try:
            public_key = self.get_public_key()
            
            decoded_token = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                audience=settings.keycloak_client_id,
                issuer=settings.keycloak_issuer,
                options={
                    "leeway": 60
                }
            )
            
            return decoded_token

        except JWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {e}",
                headers={"WWW-Authenticate": "Bearer"},
            )

keycloak_auth = KeycloakAuth()

def verify_keycloak_token(token: str = Depends(oauth2_scheme)):
    return keycloak_auth.decode_token(token)
