// pages/_app.tsx
// Remove SessionProvider entirely if you're only doing server-side
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


export default MyApp;
