import Link from 'next/link'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import IProduct from '@/interfaces/IProduct'
import { RouteNames } from '@/routes'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useRouter } from 'next/router'
import { ProductAsyncActionCreators } from '@/store/asyncActionCreators/product'
import * as yup from 'yup'


const ProductsEdit: FC = () => {
  const initialProduct = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    catalogId: 0,
    amount: 0,
    productInfo: [],
    rating: 0,
  }

  const [productInfos, setProductInfos] = useState<
  { id: number; title: string; description: string }[]
>([]);
const [imageFile, setImageFile] = useState<File | null>(null);

const [selectedCatalogId, setSelectedCatalogId] = useState<number>(0);
const { isAdmin, isLogged } = useAppSelector((state) => state.user);
const { catalogList } = useAppSelector((state) => state.catalog);

const dispatch = useAppDispatch();
const { push } = useRouter();

useEffect(() => {
  if (!isLogged && !isAdmin) {
    push(RouteNames.HOST);
  }
  if (selectedCatalogId > 0) {
    dispatch(
      ProductAsyncActionCreators.fetchAllProductsFromCatalog(
        selectedCatalogId
      )
    );
  }
}, [selectedCatalogId, isLogged, isAdmin]);

const addProductInfo = () => {
  setProductInfos([
    ...productInfos,
    { id: Date.now(), title: "", description: "" },
  ]);
};


  const validationRemoveProductSchema = yup.object().shape({
      catalogId: yup.number().min(1, "Выберите каталог"),
      productId: yup.number().min(1, "Выберите товар"),
    });
    const validationAddProductSchema = yup.object().shape({
      catalogId: yup.number().min(1, "Выберите каталог"),
      name: yup.string().required("Введите название товара"),
      price: yup
        .number()
        .positive("Цена не может быть отрицательной")
        .required("Введите цену товара"),
    });

  const [uploading, setUploading] = useState<boolean>(false)

  const [productDetails, setDetails] =
    useState<Partial<IProduct>>(initialProduct)

  useEffect(() => {}, [])

  useEffect(() => {}, [])

  return (
    <>
      <Link href={'/admin/products'} passHref>
        <button>назад</button>
      </Link>
      <form>
        <h1>Изменить карточку товара</h1>

        <form>
          <div>
            <input name="original.Id" value="@Model?.Id" type="hidden" />
            <input
              name="original.Category"
              value="@Model?.Category"
              type="hidden"
            />
            <input name="original.Name" value="@Model?.Name" type="hidden" />
            <input name="original.Price" value="@Model?.Price" type="hidden" />
            <input
              name="original.InQuantity"
              value="@Model?.InQuantity"
              type="hidden"
            />
            <input
              name="original.NameImage"
              value="@Model?.NameImage"
              type="hidden"
            />
            <div>
              <label asp-for="Category"></label>
              <select></select>
            </div>
            <div>
              <label></label>
              <input />
            </div>
            <div>
              <label></label>
              <input />
            </div>
            <div>
              <label></label>
              <input />
            </div>
            <div>
              <input />
              <br />
            </div>
            <div>
              <button>Сохранить</button>
              <a>Отмена</a>
            </div>
          </div>
        </form>
      </form>
    </>
  )
}

export default ProductsEdit
