import { IUser, IUserState } from '@/types/auth'
import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  domain,
  split,
} from 'effector-next'

const user = createDomain()

export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

/**запасной стейт */
export const setAuth = user.createEvent<boolean>()
export const setUserState = user.createEvent<IUserState>()

export const $auth = user
  .createStore<boolean>(false)
  .on(setAuth, (_, value) => value)

export const $userstate = user
  .createStore<IUserState>({} as IUserState)
  .on(setUserState, (_, value) => value)

/** */

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city)

/**07.12 */


