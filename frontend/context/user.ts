import { IUser } from '@/types/auth'
import { createDomain, createEvent, createStore } from 'effector-next'
import { jwtDecode } from 'jwt-decode'

const user = createDomain()

export const setUser = user.createEvent<IUser>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

/*   const token = createDomain()
  export const setToken = token.createEvent<IUser>()
  export const $token = token
  .createStore<IUser>({} as IUser)
  .on(setToken, (_, newToken) => newToken)

  export const $tokenPayload = token
  .createStore<IUser | null>(null)
  .on(setToken, (_, newToken) => (newToken ? jwtDecode<IUser>(newToken) : null)) */

export const setToken = createEvent<string | null>()
export const $token = createStore<string | null>(null)
export const $tokenPayload = createStore<IUser | null>(null)

$token.on(setToken, (_, newToken) => newToken)
$tokenPayload.on(setToken, (_, newToken) =>
  newToken ? jwtDecode<IUser>(newToken) : null
)

/* import { IUser } from '@/types/auth'
import { createDomain, domain } from 'effector-next'

const user = createDomain()

export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city)
 */
