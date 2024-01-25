import React from 'react'
import Head from 'next/head'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ваша мебель | Каталог</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <CatalogPage /> 
        <div className="overlay" />
      </main>
    </>
  )
}