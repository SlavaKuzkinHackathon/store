import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
    title: string
    event: Event<IFilterCheckboxItem>
    manufacturerList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
    item: IFilterCheckboxItem,
    event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
    offset: string,
    first: string,
    divans: string,
    priceFrom: string,
    priceTo: string
    partId: string,
    divanId: string,
}

export interface IFilterCheckboxItem {
    title: string,
    checked: boolean,
    id?: string,
    event: Event<IFilterCheckboxItem>
}

export interface IFilterAccordionProps {
    manufacturerList: IFilterCheckboxItem[]
    title: string | false
    setManufacturer: Event<IFilterCheckboxItem[]>
    updateManufacturer: Event<IFilterCheckboxItem>
}

interface ICatalogBaseTypes {
    priceRange: number[],
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFiltersProps extends ICatalogBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction,
    isPriceRangeChanged: boolean,
    currentPage: number,
    closePopup: VoidFunction
    setIsFilterInQuery: (arg0: boolean) => void
    filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps extends ICatalogBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction,
    spinner: boolean,
    applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps extends ICatalogBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction,
    spinner: boolean,
    applyFilters: VoidFunction,
    closePopup: VoidFunction,
    filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
    resetBtnText: string,
    title: string,
    resetFilters: VoidFunction,
    resetFilterBtnDisabled: boolean,
    closePopup: VoidFunction,
}

export interface IFilterPopupProps extends IFilterAccordionProps{
    resetFilterBtnDisabled: boolean,
    resetAllDivans: VoidFunction,
    handleClosePopup: VoidFunction,
    applyFilters: VoidFunction,
    openPopup: boolean,
}