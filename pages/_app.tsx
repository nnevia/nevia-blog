import Head from "next/head";
import Layout from "../components/layout/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setPageTransition(true);
    const handleRouteChangeComplete = () => setTimeout(() => setPageTransition(false), 50);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Layout>
        <Head>
          <meta name='viewport' content='width=divice-width, initial-scale=1' />
        </Head>
        <div className={pageTransition ? "page-exit-active" : "page-enter-active"}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </ChakraProvider>
  );
}
