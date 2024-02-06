import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { IQueryParams } from '@/types/catalog'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { useStore } from 'effector-react'
import { $auth } from '@/context/user'
import { $productOne, setProductOne } from '@/context/productOne'
import { getProductFx } from '@/app/api/products'
import { toast } from '@/components/templates/toasts'
import ProductPage from '@/components/templates/ProductPage/ProductPage'
import { useRouter } from 'next/router'
import Custom404 from '../[404]'

const CatalogProductPage = ({ query }: { query: IQueryParams }) => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const auth = useStore($auth)
  const productOne = useStore($productOne)
  const router = useRouter()
  const [error, setError] = useState(false)
  

  useEffect(() => {
    loadProductOne()
  }, [router.asPath])

  const loadProductOne = async () => {
    try {
      const data = await getProductFx(`/products/find/${query.productId}`)

      if (!data) {
        setError(true)
        return
      }
      setProductOne(data)
    } catch (error) {
      //toast.error((error as Error).message)
      console.log('Не удается получить данные продукта')
    }
  }

  return (
    <>
      <Head>
        <title>
          Ваша мебель | {shouldLoadContent ? productOne.name : ''}{' '}
        </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
            <main>
              <ProductPage />
              <div className="overlay" />
            </main>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogProductPage
