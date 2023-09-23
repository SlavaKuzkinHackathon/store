import { NextRouter } from "next/router";
import { getQueryParamOnFirstRender, idGenerator } from "./common";
import { getDivansFx } from "../../app/api/divans";
import { setFilteredDivans } from "../../context/divans";

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator()
})

export const divanManufacturers = [
  'HiFly',
  'Dunlop',
  'Mazzini',
  'Nexen',
  'Yokohama',
  'Sailun',
  'Triangle',
  'Kama',
  'Nokian',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) => price && !isNaN(price) && price >= 0 && price <= 100000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router) as string
  const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router) as string
  const divansQueryValue = JSON.parse(decodeURIComponent(
    getQueryParamOnFirstRender('divans', router) as string
  ))
  const isValidDivansQuery = Array.isArray(divansQueryValue) && !!divansQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)


  return {
    isValidDivansQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    divansQueryValue
  }
}

export const updateParamsAndFilersFromQuery = async (callback: VoidFunction, path: string) => {

  callback()

  const data = await getDivansFx(`/divans?limit=20&offset=${path}`)
  setFilteredDivans(data)
}

export async function updateParamsAndFilers<T>(updatedParams: T, path: string, router: NextRouter) {
  const params = router.query

  delete params.divans
  delete params.priceFrom
  delete params.priceTo

  router.push({
    query: {
      ...params,
      ...updatedParams,
    }
  }, undefined, { shallow: true })
  const data = await getDivansFx(`/divans?limit=20&offset=${path}`)
  setFilteredDivans(data)
  return
}

