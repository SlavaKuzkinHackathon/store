import Layout from '@/components/layout/Layout'
import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
        <Provider store={store}>
          <Layout>
            <NextNProgress />
            <Component {...pageProps} />
          </Layout>
        </Provider>
    )
}
 
