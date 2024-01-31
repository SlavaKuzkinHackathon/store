import { useMediaQuery } from '@/hooks/useMediaQuery'
import React, { useEffect, useState } from 'react'
import CatalogFiltersDesctop from './CatalogFiltersDesctop'
import {
  ICatalogFilterDesktopProps,
  ICatalogFiltersProps,
} from '@/types/catalog'
import PriceRange from './PriceRange'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $productsmModels, setFilteredModels, setProductsmModelsFromQuery } from '@/context/products'
import { useRouter } from 'next/router'
import { getProductsPaginateFx } from '@/app/api/products'
import { getQueryParamOnFirstRender } from '@/utils/common'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  //closePopup,
  //filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const productModels = useStore($productsmModels)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router)
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const modelQueryValue = JSON.parse(decodeURIComponent(
        getQueryParamOnFirstRender('model', router) as string
      ))
      const isValidModelQuery = Array.isArray(modelQueryValue) && !!modelQueryValue?.length

      const modelQuery = `&products=${getQueryParamOnFirstRender('model', router)}`

      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidModelQuery && priceFromQueryValue && priceToQueryValue) {
       updateParamAndFitersFromQuery(() => {
        setIsFilterInQuery(true)
        setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        setIsPriceRangeChanged(true)
        setProductsmModelsFromQuery(modelQueryValue)
        }, `${currentPage}${priceQuery}${modelQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamAndFitersFromQuery(() => {
         setIsFilterInQuery(true)
         setPriceRange([+priceFromQueryValue, +priceToQueryValue])
         setIsPriceRangeChanged(true)
         }, `${currentPage}${priceQuery}`)
         return
       }
 
       if (isValidModelQuery) {
        updateParamAndFitersFromQuery(() => {
         setIsFilterInQuery(true)
         setIsPriceRangeChanged(true)
         setProductsmModelsFromQuery(modelQueryValue)
         }, `${currentPage}${modelQuery}`)
         return
       }
 

    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const updateParamAndFitersFromQuery = async (callback: VoidFunction, path: string) => {
    callback()

    const data = await getProductsPaginateFx(
      `/products/all?limit=20&offset=${path}`
    )

    setFilteredModels(data)

  }

  async function updateParamAndFiters<T>(updatedParams: T, path: string) {

    const params = router.query

    delete params.model
    delete params.priceFrom
    delete params.priceTo

    router.push({ query: { ...params } }, undefined, { shallow: true })

    router.push(
      {
        query: {
          ...params,
          ...updatedParams,
        },
      },
      undefined,
      { shallow: true }
    )
    const data = await getProductsPaginateFx(
      `/products/all?limit=20&offset=${path}`
    )

    setFilteredModels(data)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)

      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])

      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const products = productModels
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodedModelsQuery = encodeURIComponent(JSON.stringify(products))

      const modelQuery = `&products=${encodedModelsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (products.length && isPriceRangeChanged) {
        updateParamAndFiters({
          model: encodedModelsQuery,
          priceFrom,
          priceTo,
          offset: initialPage + 1,
        }, `${initialPage}${priceQuery}${modelQuery}`)
        return
      }

      if (isPriceRangeChanged) {
        updateParamAndFiters({
          priceFrom,
          priceTo,
          offset: initialPage + 1,
        }, `${initialPage}${priceQuery}`)
        return
      }

      if (products.length) {
        updateParamAndFiters({
          model: encodedModelsQuery,
          offset: initialPage + 1,
        }, `${initialPage}${modelQuery}`)
        return
      }

    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesctop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
