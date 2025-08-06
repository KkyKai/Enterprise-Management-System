// Enterprise-Management-System (Copy)/frontend/pages/api/auth/[...nextauth].ts

import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

// ... (keep the refreshAccessToken function as is) ...
async function refreshAccessToken(token) {
  // ...
}


export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // On initial sign in, persist the tokens and expiry time
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token; // <-- ADD THIS LINE
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at! * 1000;
        return token;
      }

      // If the access token has not expired yet, return the existing token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If the access token has expired, try to refresh it
      console.log("Access token has expired, refreshing...");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Pass the tokens and any errors to the client-side session
      session.accessToken = token.accessToken;
      session.idToken = token.idToken; // <-- ADD THIS LINE
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);