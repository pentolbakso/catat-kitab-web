import GoogleFonts from "next-google-fonts";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;1,600&display=swap" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
