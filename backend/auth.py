from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
import requests

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

KEYCLOAK_ISSUER = "http://localhost:9800/realms/ems"
JWKS_URL = f"{KEYCLOAK_ISSUER}/protocol/openid-connect/certs"

def get_keycloak_public_key():
    jwks = requests.get(JWKS_URL).json()
    return jwt.algorithms.RSAAlgorithm.from_jwk(jwks["keys"][0])

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        public_key = get_keycloak_public_key()
        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience="account")
        return {
            "sub": payload["sub"],
            "email": payload.get("email")
        }
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
