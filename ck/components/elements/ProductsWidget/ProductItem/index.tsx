import { useState } from 'react'
import { useUnit } from 'effector-react'
import { IProduct } from '@/types/product'
import { $isDeleting, deleteProduct, updateProduct } from './index.model'
import { Button } from '@/components/ui/atoms/Button'
import { Input } from '@/components/ui/atoms/Input'
import { toast } from 'react-toastify'
import { getImageURL } from '@/utils/getImageURL'
import styles from '@/styles/admin/getProductsList.module.scss'

type ProductItemProps = {
  product: IProduct
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const [isDeleting, deleteProductEvent, updateProductEvent] = useUnit([
    $isDeleting,
    deleteProduct,
    updateProduct,
  ])

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
      <li className="flex items-start justify-start py-4 gap-2 flex-wrap">
        <div className="flex-shrink-0 w-[120px]">
          <input
            value={image}
            //onChange={(e) => setImage(e.target.value)}
            type="file"
          />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Название</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наименование"
            type="text"
          />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Описание</span>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Описание"
          />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Стоимость</span>
          <Input
            placeholder="Стоимость"
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Количество</span>
          <Input
            value={in_stock}
            onChange={(e) => setIn_stock(parseInt(e.target.value))}
            type="number"
            placeholder="Количество"
          />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Рейтинг</span>
          <Input
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            type="number"
            placeholder="Рейтинг"
          />
        </div>

        <div className="ml-auto flex flex-col gap-2">
          <Button isLoading={isPending} onClick={() => onSave()}>
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)}>Close</Button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-center py-4 gap-2">
      <div>
        <a className={styles.image}>
          <img src={getImageURL(product.image)} alt={product.name} />
        </a>
      </div>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.in_stock}</div>
      <div>{product.rating}</div>

      <div className="ml-auto flex flex-col gap-2">
        <Button
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
        </Button>
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

/* import { useState } from 'react';
import { useUnit } from 'effector-react';

import { IProduct } from '@/types/product';
//import { toast } from '@/src/shared/toasts';

import { $isDeleting, deleteProduct, updateProduct } from './index.model';

import Image from 'next/image';
import { Button } from '@/components/ui/atoms/Button';
import { Input } from '@/components/ui/atoms/Input';
import { Image as ImageType, ImageInput } from '@/src/ui/atoms/ImageInput';
import { ProductCategoriesSelect } from '@/src/shared/components/ProductCategoriesSelect';

type ProductItemProps = {
  product: IProduct;
};

export const ProductCategoryItem = ({ product }: ProductItemProps) => {
  const [isDeleting, deleteProductEvent, updateProductEvent] = useUnit([
    $isDeleting,
    deleteProduct,
    updateProduct,
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState<ImageType>({
    preview: '',
    raw: null,
  });
  const [parentCategory, setParentCategory] = useState({
    label: 'Not selected',
    value: '',
  });
  const [isPending, setIsPending] = useState(false);

  const onSave = () => {
    try {
      setIsPending(true);
      updateCategoryEvent({
        id: category.id,
        name,
        categoryIcon: icon.raw || undefined,
        parentId: parentCategory.value.trim().length
          ? Number(parentCategory.value)
          : null,
      });
      setIsEditing(false);
    } catch (error) {
      toast.unknownError(error);
    } finally {
      setIsPending(false);
    }
  };

  if (isEditing) {
    return (
      <li className="flex items-start justify-start py-4 gap-2 flex-wrap">
        <div className="flex-shrink-0 w-[120px]">
          <ImageInput preview={icon.preview} onChange={(i) => setIcon(i)} />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-grow-0 w-[230px]">
          <span className="text-xs">Parent category</span>
          <ProductCategoriesSelect
            option={parentCategory}
            onChange={(cat) => setParentCategory(cat)}
            excludeId={category.id}
          />
        </div>

        <div className="ml-auto flex flex-col gap-2">
          <Button isLoading={isPending} onClick={() => onSave()}>
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)}>Close</Button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center py-4 gap-2">
      <Image
        src={category.iconUrl}
        alt={category.name}
        width={60}
        height={60}
      />
      <div>{category.name}</div>

      <div className="ml-auto flex flex-col gap-2">
        <Button
          onClick={() => {
            setName(category.name);
            setIcon({ preview: category.iconUrl, raw: null });
            setParentCategory({
              label: category.parentName || 'Not selected',
              value: category.parentId ? category.parentId.toString() : '',
            });
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
        <Button
          onDoubleClick={() => deleteCategoryEvent(category.id)}
          isLoading={isDeleting}
          color="danger"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}; */
