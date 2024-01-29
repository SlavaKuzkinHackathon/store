import { useMediaQuery } from '@/hooks/useMediaQuery'
import React, { useState } from 'react'
import CatalogFiltersDesctop from './CatalogFiltersDesctop'
import {
  ICatalogFilterDesktopProps,
  ICatalogFiltersProps,
} from '@/types/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  //resetFilters,
  //isPriceRangeChanged,
  //currentPage,
  //setIsFilterInQuery,
  //closePopup,
  //filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)

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
          //resetFilters={resetFilters}
          //applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
