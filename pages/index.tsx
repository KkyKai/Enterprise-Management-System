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

  // Sanitize session to avoid Next.js errors
  const safeSession = {
    ...session,
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
    if (session?.idToken) {
      fetch("http://localhost:8000/auth/keycloak-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: session.idToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          // You can store the FastAPI access token in the state or context
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
// export default function Home({ session }) {
//   if (!session || !session.user) {
//     return <p>Loading or not authenticated.</p>;
//   }

// const handleLogout = async () => {
//   await signOut({ redirect: false });

//   const idToken = session.idToken;

//   const keycloakLogoutUrl = `http://localhost:9800/realms/ems/protocol/openid-connect/logout?id_token_hint=${encodeURIComponent(idToken)}&post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/signin')}`;

//   window.location.href = keycloakLogoutUrl;
// };



//   return (
//     <div>
//       <h1>Welcome, {session.user.name}</h1>
//       <p>Email: {session.user.email}</p>
//       <button onClick={handleLogout}>Log out</button>
//     </div>
//   );
// }
