import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import HomePage from '@/components/templates/HomePage/HomePage'


export default function Home() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      <Head>
        <title>Ваша мебель</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* {shouldLoadContent && ( */}
        <main>
          <HomePage />
          <div className="overlay" />
        </main>
      {/* )} */}
    </>
  )
}
