import Head from 'next/head'
import Header from '@/components/modules/Header/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1>Press</h1>
        <div className="overlay" />
      </main>
    </>
  )
}
