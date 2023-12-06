import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUpFx {
  url: string
  name: string
  password: string
  email: string
}

export interface ISignInFx {
  url: string
  email: string
  password: string
}

export interface IUser {
  name: string
  userId: number | string
  email: string
  roles: [{ id: number; value: string }]
}

export interface UserState {
  userData: IUser
  isLogged: boolean
  isAdmin: boolean
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  userData: {
    userId: 0,
    email: '',
    name: '',
    roles: [{ id: 0, value: 'USER' }],
  },
  isLogged: false,
  isAdmin: false,
  isLoading: false,
  error: '',
}
