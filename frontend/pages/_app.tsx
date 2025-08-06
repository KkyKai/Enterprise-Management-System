// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

// The 'session' prop is automatically provided by NextAuth.js to the <SessionProvider>
// We destructure it from pageProps to pass it to the provider.
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Wrap the entire application with SessionProvider
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
