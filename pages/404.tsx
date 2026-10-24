import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
export default function NotFound() {
  const de = useRouter().asPath.startsWith("/de-DE");
  return (
    <>
      <Head>
        <title>404 | KEY24</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="section not-found">
        <span className="eyebrow">KEY24 / 404</span>
        <h1>
          {de
            ? "Diese Seite ist nicht verfügbar."
            : "This page is not available."}
        </h1>
        <p>
          {de
            ? "Die gesuchte Seite existiert nicht oder wurde noch nicht veröffentlicht."
            : "The page you requested does not exist or has not been published."}
        </p>
        <Link className="action" href={de ? "/de-DE" : "/en-GB"}>
          {de ? "Zur Startseite" : "Back to home"} →
        </Link>
      </main>
    </>
  );
}
