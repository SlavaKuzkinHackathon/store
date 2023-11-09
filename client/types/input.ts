import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ITextInputs {
    textInput: string,
}


export interface IAuthTextInput {
    register: UseFormRegister<ITextInputs>,
    errors: FieldErrors<ITextInputs>
}