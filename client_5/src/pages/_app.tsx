import type { AppProps } from "next/app";
import Layout from "../../components/Layout";
import { withHydrate } from "effector-next";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NextProgress from 'nextjs-progressbar'
import '../styles/globals.css'

const enhance = withHydrate()

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    mounted && (
      <>
      <NextProgress />
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            limit={1}
            theme="light"
          />
        </Layout>
      </>
    )
  );
}

export default enhance(MyApp as React.FC<AppProps>)