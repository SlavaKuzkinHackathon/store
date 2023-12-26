export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  images: string
  in_stock: number
  rating: number
}

export interface IProducts {
  id: number
  name: string
  price: number
  description: string
  images: string
  in_stock: number
  rating: number
}

export interface ICreateProduct {
  url: string
  product: IProduct
}

/* export interface IProducts {
  count: number
  rows: IProduct[]
} */
