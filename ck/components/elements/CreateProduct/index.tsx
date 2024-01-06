import { createProductFx } from '@/app/api/products'
import { $product } from '@/context/product'
import { createProduct } from '@/context/products'
import styles from '@/styles/admin/createProduct.module.scss'
import { IProduct } from '@/types/products'
import { getAuthDataFromLS } from '@/utils/auth'
import { useStore } from 'effector-react'
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

const CreateProduct = () => {
  const initialProduct = {
    name: '',
    description: '',
    price: 0,
    rating: 0,
    in_stock: 0,
    image: '',
  }

  const prod = useStore($product)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [productDetails, setDetails] =
    useState<Partial<IProduct>>(initialProduct)
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    if (prod) {
      setDetails({
        name: prod.name,
        price: prod.price,
        in_stock: prod.in_stock,
        description: prod.description,
        rating: prod.rating,
        image: prod.image,
      })
    }
  }, [prod])

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const uploadFileHandler = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    const authData = getAuthDataFromLS()

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const productCreate = await createProductFx({
        url: '/products',
        product: {
          name: prod.name,
          description: prod.description,
          price: prod.price,
          in_stock: prod.in_stock,
          rating: prod.rating,
          image: prod.image,
        },
        token: authData.access_token,
        formData,
      })
      setDetails({ ...productDetails, image: productCreate })
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h1>Создать товар</h1>
      <div className={styles.form_item}>
        <input
          value={productDetails.name}
          onChange={(e) =>
            setDetails({ ...productDetails, name: e.target.value })
          }
          type="text"
          placeholder="Наименование"
          className="form-control"
        />
      </div>

      <div className={styles.form_item}>
        <input
          type="text"
          placeholder="Описание"
          className="form-control"
          value={productDetails.description}
          onChange={(e) =>
            setDetails({ ...productDetails, description: e.target.value })
          }
        />
      </div>
      <div className={styles.form_item}>
        <input
          
          type="number"
          placeholder="Стоимость"
          className="form-control"
          value={productDetails.price}
          onChange={e =>
            setDetails({
              ...productDetails,
              price: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div className={styles.form_item}>
        <input
           value={productDetails.in_stock}
           onChange={e =>
             setDetails({
               ...productDetails,
               in_stock: parseInt(e.target.value),
             })
           }
          type="number"
          placeholder="Количество"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          value={productDetails.rating}
          onChange={e =>
            setDetails({
              ...productDetails,
              rating: parseInt(e.target.value),
            })
          }
          type="number"
          placeholder="Рейтинг"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          onChange={uploadFileHandler}
          type="file"
          placeholder="Image"
          className="form-control"
        />
      </div>
      <button>Создать</button>
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
        image: imagesInputValue,
      },
      token: authData.access_token,
      formData
    })
    //id ошибка в productList
    //createProduct(productCreate)
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
        <input
          ref={ratingRef}
          type="number"
          placeholder="Рейтинг"
          className="form-control"
        />
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
