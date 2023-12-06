import { IUser } from '@/types/auth'
import { createDomain, domain } from 'effector-next'

const user = createDomain()

export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

/**запасной стейт */
export const setAuth = user.createEvent<boolean>()
export const setUserName = user.createEvent<{ name: string; email: string }>()

export const $auth = user
  .createStore<boolean>(false)
  .on(setAuth, (_, value) => value)

export const $username = user
  .createStore({name: '', email: ''})
  .on(setUserName, (_, value) => value)
 /** */


export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)


export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city)
