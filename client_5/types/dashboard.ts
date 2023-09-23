import {IDivan} from './divans'

export interface IDashboardSlider {
    items: IDivan[],
    spinner: boolean,
    goToPathPage?: boolean,
}

export interface ICartAlertProps {
    count: number,
    closeAlert: VoidFunction
}