import Head from 'next/head'
import React from 'react'
//import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'

function Services() {
  const getDefaultTextGenerator = useCallback(() => 'Услуги', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title> Ваша мебель | Услуги </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
        <main>
          {/* <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          /> */}
          <h1>Услуги</h1>
          <div className="overlay" />
        </main>
    </>
  )
}

export default Services
