import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

export default function Home() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)

  return (
    <>
      <Head>
        <title>Ваша мебель | {shouldLoadContent}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {shouldLoadContent}
      <main>
        <h1>Press</h1>
        <div className="overlay" />
      </main>
    </>
  )
}
