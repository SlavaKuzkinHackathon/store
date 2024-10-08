import { useEffect, useId } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useUnit } from 'effector-react'

import styles from '@/styles/admin/createProduct.module.scss'
import { $isPending, formSubmitted, productCreated } from './index.model'

const CreateProduct = () => {
  const [isPending] = useUnit([$isPending])

  const formSubmittedEvent = useUnit(formSubmitted)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      rating: 0,
      in_stock: 0,
      image: '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({
      name: data.name,
      description: data.description,
      price: data.price,
      in_stock: data.in_stock,
      rating: data.rating,
      image: data.image,
    })
    
  })

  useEffect(() => {
    return productCreated.watch(() => {
      reset()
    })
  }, [reset])

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      <h1>Создать товар</h1>
      <div className={styles.form_item}>
        <input
          {...register('name', { required: '0Name is required!' })}
          placeholder="Наименование"
          type="text"
        />
      </div>

      <div className={styles.form_item}>
        <input
          {...register('description')}
          type="text"
          placeholder="Описание"
        />
      </div>
      <div className={styles.form_item}>
        <input
          placeholder="Стоимость"
          className="form-control"
          type="number"
          {...register('price', {
            required: 'Price is required!',
            valueAsNumber: true,
          })}
        />
      </div>
      <div className={styles.form_item}>
        <input
          {...register('in_stock')}
          type="number"
          placeholder="Количество"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          {...register('rating')}
          type="number"
          placeholder="Рейтинг"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input 
        {...register('image')}
        type="file"/>
      </div>
       <button >Создать</button>
    </form>
  )
}

export default CreateProduct

/* import { createProductFx } from '@/app/api/products'
import { createProduct } from '@/context/products'
import styles from '@/styles/admin/createProduct.module.scss'
import { getAuthDataFromLS } from '@/utils/auth'
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react'

const CreateProduct = () => {
  const [imageFile, setImageFile] = useState<boolean>(false)

  const nameRef = useRef() as MutableRefObject<HTMLInputElement>
  const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>
  const in_stockRef = useRef() as MutableRefObject<HTMLInputElement>
  const ratingRef = useRef() as MutableRefObject<HTMLInputElement>
  const imagesRef = useRef() as MutableRefObject<HTMLInputElement>

  const formSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[0]
    const formData = new FormData()
    formData.append('images', file)
    setImageFile(true)

    const nameInputValue = nameRef.current.value
    const descriptionInputValue = descriptionRef.current.value
    const priceInputValue = priceRef.current.value
    const in_stockInputValue = in_stockRef.current.value
    const ratingInputValue = ratingRef.current.value
    const imagesInputValue = imagesRef.current.value

    const authData = getAuthDataFromLS()

    const productCreate = await createProductFx({
      url: '/products',
      product: {
        name: nameInputValue,
        description: descriptionInputValue,
        price: parseInt(priceInputValue),
        in_stock: parseInt(in_stockInputValue),
        rating: parseInt(ratingInputValue),
        images: imagesInputValue,
      },
      token: authData.access_token,
    })
  //id ошибка в productList 
    createProduct(productCreate)
  }

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <h1>Создать товар</h1>
      <div className={styles.form_item}>
        <input
          ref={nameRef}
          type="text"
          placeholder="Наименование"
          className="form-control"
        />
      </div>

      <div className={styles.form_item}>
        <input
          ref={descriptionRef}
          type="text"
          placeholder="Описание"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          ref={priceRef}
          type="number"
          placeholder="Стоимость"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          ref={in_stockRef}
          type="number"
          placeholder="Количество"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input ref={ratingRef} placeholder="Рейтинг" className="form-control" />
      </div>
      <div className={styles.form_item}>
        <input
          ref={imagesRef}
          type="file"
          placeholder="Image"
          className="form-control"
        />
        {imageFile}
      </div>
      <button>Создать</button>
    </form>
  )
}

export default CreateProduct
 */
