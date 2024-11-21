import Head from "next/head";
import Layout from "../components/layout/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setPageTransition(true);
    const handleRouteChangeComplete = () => setTimeout(() => setPageTransition(false), 100);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=divice-width, initial-scale=1' />
      </Head>
      <div className={pageTransition ? "page-exit-active" : "page-enter-active"}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
