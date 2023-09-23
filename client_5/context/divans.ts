import { createDomain } from "effector-next";
import { IDivans } from '../types/divans'
import { IFilterCheckboxItem } from "../types/catalog";
import { divanManufacturers } from "@/utils/catalog";

const divanS = createDomain()

export const setDivans = divanS.createEvent<IDivans>()

export const setDivansCheapFirst = divanS.createEvent()
export const setDivansExpendensiveFirst = divanS.createEvent()
export const setDivansByPopularity = divanS.createEvent()
export const setFilteredDivans = divanS.createEvent()

export const setDivansManufacturers = divanS.createEvent<IFilterCheckboxItem[]>()
export const updateDivansManufacturers = divanS.createEvent<IFilterCheckboxItem>()
export const setDivansManufacturersFromQuery = divanS.createEvent<string[]>()

const updateManufacturer = (manufacturers: IFilterCheckboxItem[],
    id: string,
    payload: Partial<IFilterCheckboxItem>) =>
    manufacturers.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                ...payload
            }
        }
        return item
    })

const updateManufacturerFromQuery = (
    manufacturers: IFilterCheckboxItem[],
    manufacturersFromQuery: string[]
) =>
    manufacturers.map((item) => {
        if (manufacturersFromQuery.find((title) => title === item.title)) {
            return {
                ...item,
                checked: true
            }
        }
        return item
    })

export const $divans = divanS
    .createStore<IDivans>({} as IDivans)
    .on(setDivans, (_, divans) => divans)
    .on(setDivansCheapFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => a.price - b.price)
    }))
    .on(setDivansExpendensiveFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.price - a.price)
    }))
    .on(setDivansByPopularity, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.popularity - a.popularity)
    }))
    

export const $divansManufactures = divanS
    .createStore<IFilterCheckboxItem[]>(divanManufacturers as IFilterCheckboxItem[])
    .on(setDivansManufacturers, (_, divans) => divans)
    .on(updateDivansManufacturers, (state, payload) => [
        ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
    ])
    .on(setDivansManufacturersFromQuery, (state, manufacturersFromQuery) => 
    [...updateManufacturerFromQuery(state, manufacturersFromQuery)] )

export const $filteredDivans = divanS
    .createStore<IDivans>({} as IDivans)
    .on(setFilteredDivans, (_, divans) => divans)