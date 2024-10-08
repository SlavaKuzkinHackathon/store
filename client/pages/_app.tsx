import Layout from '@/components/layout/Layout'
import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'


export default function App({ Component, pageProps }: AppProps) {
  return (
        <Provider store={store}>
          <Layout headTitle="">
            <NextNProgress />
            <Component {...pageProps} />
          </Layout>
        </Provider>
    )
}
 
