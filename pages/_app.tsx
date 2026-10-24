import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@fontsource/ibm-plex-sans/latin-ext-300.css";
import "@fontsource/ibm-plex-sans/latin-ext-400.css";
import "@fontsource/ibm-plex-sans/latin-ext-500.css";
import "@fontsource/ibm-plex-sans/latin-300.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "../styles/key24.scss";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.lang =
      router.query.locale === "de-DE" ? "de-DE" : "en-GB";
  }, [router.query.locale]);
  return <Component {...pageProps} />;
}
