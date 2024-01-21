import { IProduct } from './product'

export interface IDashboardSlider {
  items: IProduct[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
