import { useEffect, useId, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { IProduct, IProductImage, ProductImageSchema, ProductSchema } from '@/types/product'
import styles from '@/styles/admin/createProduct.module.scss'
import { $isPending, formSubmitted, productCreated } from './index.model'
import { createProduct } from '@/context/product'
import { MultipleImagesInput } from '@/components/ui/molecules/MultipleImagesInput'
import { Field } from '@/components/ui/molecules/Field/Field'
import {
  Image as ImageType,
  ImageInput,
} from '@/components/ui/atoms/ImageInput'

const CreateProduct = () => {
  const [isPending] = useUnit([$isPending])

  const formSubmittedEvent = useUnit(formSubmitted)

  const [icon, setIcon] = useState<ImageType>({
    preview: '',
    raw: null,
  })
  const [productImages, setProductImages] = useState<
    { id: number; image: string; }[]
  >([]);

  const { register,
    handleSubmit,
    formState: { errors },
    control,
    reset, } = useForm({
      defaultValues: {
        name: '',
        description: '',
        price: 0,
        rating: 0,
        in_stock: 0,
        productImage: [] as { preview: string; raw: Blob }[],

      },
    })


    
  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({
      name: data.name,
      description: data.description,
      price: data.price,
      in_stock: data.in_stock,
      rating: data.rating,
      productImage: data.productImage.map((image) => image.raw),
    })

  })
  console.log('prodImgEl', onSubmit);
  
  useEffect(() => {
    return productCreated.watch(() => {
      reset()
    })
  }, [reset])

  const imagesId = useId();

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

      <Field label="Images" htmlFor={imagesId} className="mb-4">
        <Controller
          control={control}
          name="productImage"
          rules={{
            validate: (value) => value.length > 0 || 'Add images',
          }}
          render={({ field }) => (
            <MultipleImagesInput
              images={field.value}
              onChange={(newImages) => field.onChange(newImages)}
              id={imagesId}
            />
          )}
        />
      </Field>
      <button >Создать</button>
    </form>
  )
}

export default CreateProduct
