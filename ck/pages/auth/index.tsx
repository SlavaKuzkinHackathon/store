import AuthPage from '@/components/templates/AuthPage/AuthPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

const Auth = () => {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  return (
    <>
      <Head>
        <title>Ваша мебель | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth
