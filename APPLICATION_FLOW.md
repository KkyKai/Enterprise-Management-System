# Application Code Flow: Frontend to Backend

This document outlines the complete flow of the application, from a user's interaction on the frontend to the backend processing and data retrieval.

The application uses a modern, decoupled architecture with a Next.js frontend and a Python (FastAPI) backend. Authentication is handled by Keycloak, orchestrated by NextAuth.js on the frontend.

## High-Level Flow

1.  **Frontend (Next.js)**: The user interacts with the web interface, built with React and Next.js.
2.  **Authentication (NextAuth.js + Keycloak)**: The user authenticates via Keycloak. NextAuth.js manages the session and tokens on the client-side.
3.  **API Request**: The frontend makes a request to the backend API, including a JWT (JSON Web Token) for authorization.
4.  **Backend (FastAPI)**: The backend receives the request, validates the JWT, processes the request, interacts with the database, and returns a response.
5.  **UI Update**: The frontend receives the backend's response and updates the user interface accordingly.

---

## Detailed Code Flow

### Frontend (Next.js & NextAuth.js)

1.  **Authentication with Keycloak:**
    *   When a user is not signed in, the `frontend/pages/index.tsx` component displays a "Sign in" button.
    *   Clicking this button triggers `signIn('keycloak')`, which redirects the user to the project's Keycloak instance for authentication.
    *   After a successful login, Keycloak redirects the user back to the Next.js application with an authorization code.
    *   NextAuth.js, configured in `frontend/pages/api/auth/[...nextauth].ts`, handles this callback. It securely exchanges the authorization code for an `access_token`, `refresh_token`, and `id_token` from Keycloak.
    *   The `useSession()` hook in `index.tsx` now returns a session object containing these tokens and user information.

2.  **Calling the Backend:**
    *   The `useEffect` hook in `index.tsx` is triggered whenever the `session` object changes (e.g., on login or token refresh).
    *   If a `session.accessToken` exists, the `loginToBackend` function is called.
    *   `loginToBackend` makes a `POST` request to the `http://localhost:8000/auth/login` endpoint on the FastAPI backend.
    *   Crucially, it includes the Keycloak `access_token` in the `Authorization` header as a Bearer token.

### Backend (FastAPI)

3.  **Backend Login Endpoint:**
    *   The request from the frontend hits the `/auth/login` endpoint in the FastAPI application. This is handled by the router in `backend/authentication/main.py`.
    *   This endpoint is protected and requires a valid Keycloak JWT.

4.  **Token Verification:**
    *   FastAPI, using the `Depends(verify_keycloak_token)` dependency, calls the `verify_keycloak_token` function in `backend/authentication/auth.py`.
    *   This function uses the `python-keycloak` and `python-jose` libraries to:
        *   Fetch the public key from the Keycloak realm.
        *   Decode and validate the `access_token` received from the frontend. It checks the signature, expiration time, issuer, and audience.
    *   If the token is valid, the decoded token (containing user information like email, sub, etc.) is returned. If invalid, a `401 Unauthorized` error is raised.

5.  **User Data Retrieval:**
    *   Once the token is verified, a protected endpoint like `/api/users/courses/completed/roa/` in `backend/controller/api/routes/users.py` can be accessed.
    *   The `get_current_user` dependency (from `authentication/main.py`) uses the information from the verified token to fetch the user's details from the database.
    *   The `read_my_completed_roa_courses` function then uses the user's email to query the database for their completed courses via `crud.get_user_roa_courses`.

6.  **Database Interaction:**
    *   The `backend/models/crud.py` file contains the SQLAlchemy queries to interact with the database.
    *   `backend/models/models.py` defines the database table structures (ORM models).
    *   `backend/models/database.py` manages the database connection engine and sessions.

7.  **Response to Frontend:**
    *   The backend sends the query results (e.g., a list of completed courses) back to the frontend as a JSON response.
    *   The `index.tsx` component receives this JSON, stores it in the `backendResponse` state variable, and displays it on the page.

### Summary

The application uses a robust and secure authentication flow:

1.  **Frontend-first Authentication:** The Next.js frontend handles the entire user authentication process with Keycloak via NextAuth.js.
2.  **Token-based Backend Authorization:** The frontend obtains a JWT from Keycloak and passes it to the FastAPI backend with every request to a protected route.
3.  **Stateless Backend:** The backend is stateless. It does not manage sessions. It simply validates the JWT on each incoming request to authorize the user, making it scalable and secure.
