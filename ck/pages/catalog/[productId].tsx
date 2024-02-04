import React, { useEffect } from 'react'
import Head from 'next/head'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import { IQueryParams } from '@/types/catalog'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { useStore } from 'effector-react'
import { $auth } from '@/context/user'
import { $productOne, setProductOne } from '@/context/productOne'
import { getProductFx } from '@/app/api/products'
import { toast } from '@/components/templates/toasts'

const ProductPage = ({ query }: { query: IQueryParams }) => {
  const auth = useStore($auth)
  const { shouldLoadContent } = useRedirectByUserCheck()
  const productOne = useStore($productOne)

  useEffect(() => {
    loadProductOne()
  }, [])

  const loadProductOne = async () => {
    try {
      const data = await getProductFx(`/products/find/${query.productId}`)

      setProductOne(data)
    } catch (error) {
      //toast.error((error as Error).message)
      console.log('Не удается получить данные продукта');
      
    }
  }

  return (
    <>
      <Head>
        <title> Ваша мебель | {shouldLoadContent ? productOne.name : ''} </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
         {shouldLoadContent && 
          <h1>{productOne.name}</h1>
         }  
        
      </main>
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default ProductPage
