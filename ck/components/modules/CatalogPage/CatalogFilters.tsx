import { useMediaQuery } from '@/hooks/useMediaQuery'
import React, { useState } from 'react'
import CatalogFiltersDesctop from './CatalogFiltersDesctop'
import {
  ICatalogFilterDesktopProps,
  ICatalogFiltersProps,
} from '@/types/catalog'
import PriceRange from './PriceRange'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $productsmModels, setFilteredModels } from '@/context/products'
import { useRouter } from 'next/router'
import { getProductsPaginateFx } from '@/app/api/products'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,

  //setIsFilterInQuery,
  //closePopup,
  //filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const productModels = useStore($productsmModels)
  const router = useRouter()

  const applyFilters = async () => {
    try {
      setSpinner(true)

      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])

      const priceQuery = isPriceRangeChanged
        ? `priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const models = productModels
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodedModelsQuery = encodeURIComponent(JSON.stringify(models))

      const modelQuery = `&model=${encodedModelsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (models.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              model: encodedModelsQuery,    //products
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getProductsPaginateFx(
          `/products/all?limit=20&offset=${initialPage}${priceQuery}${modelQuery}`
        )

        setFilteredModels(data)
        return
      }

      if(isPriceRangeChanged){
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getProductsPaginateFx(
          `/products/all?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilteredModels(data)
        return
      }
      if(models.length){
        router.push(
          {
            query: {
              ...router.query,
              model: encodedModelsQuery,    //products
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getProductsPaginateFx(
          `/products/all?limit=20&offset=${initialPage}${modelQuery}`
        )

        setFilteredModels(data)
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
