import React from 'react'
import Head from 'next/head'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import { IQueryParams } from '@/types/catalog'

const Catalog = ({query} : { query: IQueryParams}) => {
  return (
    <>
      <Head>
        <title>Ваша мебель | Каталог</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <CatalogPage query={query}/>
        <div className="overlay" />
      </main>
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: {query: {...context.query}}
  }
}

export default Catalog
