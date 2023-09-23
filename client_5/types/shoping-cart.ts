export interface IShopingCartItem {
    id: number
    name: string
    price: number
    image: string
    in_stock: number
    divans_manufacturer: string
    count: number
    total_price: number
    userId: number
    divansId: number
}


export interface IAddToCartFx {
    url: string,
    username: string,
    divansId: number
}

export interface IUpdateCartItemFx {
    url: string
    payload: {
        total_price?: number,
        count?: number
    }
}

export interface ICartItemCounterProps{
    totalCount: number,
    divansId: number,
    initialCount: number,
    increasePrice: VoidFunction,
    decreasePrice: VoidFunction,
}