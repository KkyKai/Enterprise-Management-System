import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [backendResponse, setBackendResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);

  // This function calls your FastAPI backend
  const loginToBackend = async (token: string) => {
    setError(null);
    setBackendResponse(null);
    try {
      console.log("Attempting to log in to backend with token...");
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Backend login failed');
      }

      const data = await response.json();
      console.log("Backend login successful:", data);
      setBackendResponse(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during backend login:", err.message);
        setError(err.message);
      } else {
        console.error("An unknown error occurred during backend login");
        setError("An unknown error occurred");
      }
    }
  };

  // This useEffect hook runs whenever the session object changes.
  // next-auth handles refreshing the token in the background, which updates the session.
  // This ensures we always use the latest token to call the backend.
  useEffect(() => {
    if (session?.accessToken) {
      loginToBackend(session.accessToken);
    }
    
    // If the session has an error (e.g., refresh failed), force the user to sign in again.
    if (session?.error === "RefreshAccessTokenError") {
        signIn('keycloak');
    }

  }, [session]);

 const handleLogout = async () => {
    try {
      const idToken = session?.idToken as string;
      const issuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
      const redirectUri = window.location.origin; // Redirects back to the homepage

      if (idToken && issuer) {
        // 1. Sign out from NextAuth locally
        await signOut({ redirect: false });
        
        // 2. Construct the Keycloak logout URL with id_token_hint
        const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);
        logoutUrl.searchParams.set("id_token_hint", idToken);
        logoutUrl.searchParams.set("post_logout_redirect_uri", redirectUri);

        // 3. Redirect to Keycloak
        window.location.href = logoutUrl.toString();
      } else {
        // Fallback for cases where idToken is not available
        await signOut({ callbackUrl: redirectUri });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Fallback to simple signout on error
      await signOut({ callbackUrl: window.location.origin });
    }
  };


  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Next.js + Keycloak + FastAPI</h1>
      {!session && (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn('keycloak')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={handleLogout}>Sign out</button>

          <div style={{ marginTop: '20px', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>Backend API Response</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {backendResponse ? <pre>{JSON.stringify(backendResponse, null, 2)}</pre> : <p>Calling backend...</p>}
          </div>
        </>
      )}
    </div>
  );
}