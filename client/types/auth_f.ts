import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IInputs {
    name: string,
    email: string,
    password: string,
}


export interface IAuthPageInput {
    register: UseFormRegister<IInputs>,
    errors: FieldErrors<IInputs>
}

export interface ISignUpFx {
    name: string,
    email: string,
    password: string,
}

export interface ISignInFx {
    email: string,
    password: string,
}

export interface IUser{
    username: string,
    userId: number | string,
    email: string
}