export interface IDivan {
    id: number
    divans_manufacturer: string
    price: number
    vendor_code: string
    name: string
    description: string
    images: string
    in_stock: number
    bestseller: boolean
    new: boolean
    popularity: number
}

export interface IDivans {
    count: number
    rows: IDivan[]
  }