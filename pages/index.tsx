import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import React, { useEffect } from 'react';


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  // Sanitize session to avoid Next.js serialization errors by replacing undefined with null
  const safeSession = {
    ...session,
    accessToken: session.accessToken ?? null,
    idToken: session.idToken ?? null,
    user: {
      ...session.user,
      image: session.user?.image ?? null,
    },
  };

  return {
    props: { session: safeSession },
  };
}


export default function Home({ session }) {
  useEffect(() => {
    // Ensure both tokens are present before making the fetch call
    if (session?.idToken && session?.accessToken) {
      fetch("http://localhost:8000/auth/keycloak-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send both tokens to the backend
        body: JSON.stringify({
          token: session.idToken,
          access_token: session.accessToken,
        }),
      })
        .then((res) => {
             if (!res.ok) {
                // Log the error response from the backend for more details
                return res.json().then(err => { throw err });
             }
             return res.json();
        })
        .then((data) => {
          console.log("FastAPI login successful:", data);
        })
        .catch((error) => {
          console.error("FastAPI login failed:", error);
        });
    }
  }, [session]);

  if (!session || !session.user) {
    return <p>Loading or not authenticated.</p>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });

    const idToken = session.idToken;

    const keycloakLogoutUrl = `http://localhost:9800/realms/ems/protocol/openid-connect/logout?id_token_hint=${encodeURIComponent(
      idToken
    )}&post_logout_redirect_uri=${encodeURIComponent(
      "http://localhost:3000/api/auth/signin"
    )}`;

    window.location.href = keycloakLogoutUrl;
  };

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
