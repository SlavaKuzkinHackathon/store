import { IProduct } from './productsm'

export interface IDashboardSlider {
  items: IProduct[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
