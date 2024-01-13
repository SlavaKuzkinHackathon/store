import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { $isDeleting, deleteProduct, updateProduct } from './index.model'
import { IProduct } from '@/types/product'
import { toast } from 'react-toastify'
import { getImageURL } from '@/utils/getImageURL'
import styles from '@/styles/admin/getProductsList.module.scss'
import { Button } from '@/components/ui/atoms/Button'

type ProductItemProps = {
  product: IProduct
}

export const UpdateProductItem = ({ product }: ProductItemProps) => {
  const [isDeleting, deleteProductEvent, updateProductEvent] = useUnit([$isDeleting,
    deleteProduct, updateProduct])

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [in_stock, setIn_stock] = useState(0)
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState('')

  const [isPending, setIsPending] = useState(false)


  const onSave = () => {
    try {
      setIsPending(true)
      updateProductEvent({
        id: product.id,
        name,
        description,
        price,
        in_stock,
        rating,
        image,
      })
      setIsEditing(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <li>
        <div className={styles.form_item}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наименование"
            type="text"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Описание"
          />
        </div>
        <div className={styles.form_item}>
          <input
            placeholder="Стоимость"
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={in_stock}
            onChange={(e) => setIn_stock(parseInt(e.target.value))}
            type="number"
            placeholder="Количество"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            type="number"
            placeholder="Рейтинг"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="file"
          />
        </div>
        <button onClick={() => onSave()}>Создать</button>
        <button onClick={() => setIsEditing(false)}>Закрыть</button>
      </li>
    )
  }

  return (
    <li>
      <a className={styles.image}>
        <img src={getImageURL(product.image)} alt={product.name} />
      </a>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.in_stock}</div>
      <div>{product.rating}</div>

      <div>
        <button
          onClick={() => {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setIn_stock(product.in_stock)
            setRating(product.rating)
            setImage(product.image)
            setIsEditing(true)
          }}
        >
          Edit
        </button>
        <Button
          onDoubleClick={() => deleteProductEvent(product.id)}
          isLoading={isDeleting}
          color="danger"
        >
          Delete
        </Button>
      </div>
    </li>
  )

}

