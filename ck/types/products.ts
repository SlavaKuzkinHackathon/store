export interface IProduct {
  _id?: number | string;
  name: string
  price: number
  description: string
  image: string
  in_stock: number
  rating: number
}

export interface IProducts {
  id: number
  name: string
  price: number
  description: string
  image: string
  in_stock: number
  rating: number
}


export interface IBaseEffectArgs {
  url: string;
  token: string;
  formData: FormData

}

export interface ICreateProduct extends IBaseEffectArgs {
  product: IProduct;
}