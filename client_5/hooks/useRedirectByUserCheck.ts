import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { checkUserAuthFx } from "../app/api/auth"
import { current } from "@reduxjs/toolkit"
import { setUser } from "../context/user"

const useRedirectByUserCheck = (isAuthPage = false) => {
    const [shouldLoadContent, setShouldLoadContent] = useState(false)
    const router = useRouter()
    const shouldCheckAuth = useRef(true)

    useEffect(() => {
        if(shouldCheckAuth.current){
            shouldCheckAuth.current = false
            checkUser()
        }
    },[])


    const checkUser = async () => {
        const user = await  checkUserAuthFx('/users/login-check')

        if(isAuthPage){
            if(!user){
                setShouldLoadContent(true)
                return
            }
            //router.push('/')
        }
        if(isAuthPage){
            if(user){
                setUser(user)
                setShouldLoadContent(true)
                return
            }
        }

        //router.push('/')
    }
    return {shouldLoadContent}
}

export default useRedirectByUserCheck