import styles from '@/styles/ui/input.module.scss'
import { ChangeEvent } from 'react';


export type TextFieldType = "text" | "number" | "email" | "tel";

const isValuesValid = true

interface TextInputProps {
  //name: string;
  type: TextFieldType;
  //value: string | number;
  /* onInput: (value: string) => void; */
  placeholder: string;
  //error: string;
  /* required: boolean; */
}


function Input({ /* value *//* error, */ type,/*  name */placeholder, /* required, */ /* onInput */ }: TextInputProps
) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    /* onInput(value); */
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${isValuesValid && `${styles._ok}`}`}
        /* value={value || ''} */
        /* onChange={onChange} */
        type={type}
        /* name={name} */
        placeholder={placeholder}
        /* required={Boolean(required)} */
      />
      <span className={styles.errorText}>{/* {error} */}</span>
      <span className={isValuesValid ? styles.icon : ''}></span>
    </div>
  );
}

export default Input;