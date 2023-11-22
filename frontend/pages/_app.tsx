import Layout from '@/components/layout/Layout'
import { withHydrate } from 'effector-next'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [moutned, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    moutned && (
      <>
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
  )
}

export default enhance(App as React.FC<AppProps>)
