from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, jwk
import requests

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

KEYCLOAK_ISSUER = "http://localhost:9800/realms/ems"
JWKS_URL = f"{KEYCLOAK_ISSUER}/protocol/openid-connect/certs"

def get_keycloak_public_key():
    """
    Fetches the JWKS from Keycloak and constructs a key object
    that can be used for verification.
    """
    try:
        response = requests.get(JWKS_URL)
        response.raise_for_status()
        jwks = response.json()
        
        # Use jwk.construct to build the key from the JWK dictionary
        public_key = jwk.construct(jwks['keys'][0], algorithm='RS256')
        return public_key
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Could not fetch JWKS: {e}")
    except (KeyError, IndexError) as e:
        raise HTTPException(status_code=500, detail=f"Could not find a valid key in JWKS: {e}")


# This function is for protecting future endpoints, not for the initial login.
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        public_key = get_keycloak_public_key()
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience="ems-frontend"
        )
        return payload
    except jwt.JWTError as e:
        raise HTTPException(status_code=401, detail=f"Could not validate credentials: {e}")
