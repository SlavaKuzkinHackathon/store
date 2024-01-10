export interface IProduct {
  id: number
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
}

export interface ProductSchema  {
  product: IProduct;
}