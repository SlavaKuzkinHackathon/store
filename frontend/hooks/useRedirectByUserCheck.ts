import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { IUser } from '@/types/auth'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFx('/auth/login-check')
    //localStorage.setItem('auth_connect', user)
   /*  const token = localStorage.getItem('auth_con');
		const user = await checkUserAuthFx(token) */
    //localStorage.setItem('auth_connect', JSON.stringify(user.accessToken))
    /* const userData: IUser = await jwtDecode(token)
    const user = await checkUserAuthFx(userData); 
    const token = localStorage.getItem('auth_con');
		const user = await checkUserAuthFx(token);
    */

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true)
        return
      }

      router.push('/')
      return
    }

    if (user) {
      setUser(user)
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
