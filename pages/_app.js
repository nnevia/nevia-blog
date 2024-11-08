import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=divice-width, initial-scale=1' />
        {/* 브라우저가 페이지를 어떻게 표시할지에 대한 정보 */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
