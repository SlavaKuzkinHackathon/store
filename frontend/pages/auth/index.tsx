import AuthPage from '@/components/templates/AuthPage/AuthPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

const Auth = () => {
    const { shouldLoadContent } = useRedirectByUserCheck(true)
  return (
    <>
       && <AuthPage />
    </>
  )
}

export default Auth
