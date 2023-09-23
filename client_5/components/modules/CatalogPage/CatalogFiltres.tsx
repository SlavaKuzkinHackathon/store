import { useEffect, useState } from "react"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { ICatalogFiltersProps } from "../../../types/catalog"
import CatalogFiltersDesktop from "./CatalogFiltersDesktop"
import { toast } from "react-toastify"
import { useStore } from "effector-react"
import { $divansManufactures, setDivansManufacturersFromQuery, setFilteredDivans } from "../../../context/divans"
import { useRouter } from "next/router"
import { getQueryParamOnFirstRender } from "@/utils/common"
import CatalogFiltersMobile from "./CatalogFiltersMobile"
import { checkQueryParams, updateParamsAndFilers, updateParamsAndFilersFromQuery } from "@/utils/catalog"

const CatalogFilters = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
    closePopup,
    filtersMobileOpen
}: ICatalogFiltersProps) => {
    const isMobile = useMediaQuery(820)
    const [spinner, setSpinner] = useState(false)
    const divanManufactuters = useStore($divansManufactures)
    const router = useRouter()


    useEffect(() => {
        applayFiltersFromQuery()
    }, [])



    const applayFiltersFromQuery = async () => {
        try {
            const {
                priceFromQueryValue,
                priceToQueryValue,
                isValidDivansQuery,
                isValidPriceQuery,
                divansQueryValue
            } = checkQueryParams(router)

            const divansQuery = `&divans=${getQueryParamOnFirstRender('divans', router)}`
            const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

            if (isValidDivansQuery &&
                isValidPriceQuery) {
                updateParamsAndFilersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setDivansManufacturersFromQuery(divansQueryValue)
                }, `${currentPage}${priceQuery}${divansQuery}`)
                return
            }

            if (isValidPriceQuery) {
                updateParamsAndFilersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                }, `${currentPage}${priceQuery}`)

            }

            if (isValidDivansQuery) {
                updateParamsAndFilersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setDivansManufacturersFromQuery(divansQueryValue)
                }, `${currentPage}${divansQuery}`)
            }

        } catch (error) {
            const err = error as Error

            if (err.message === 'URI malformed') {
                toast.warning('Неправильный url для фильтров')
                return
            }

            toast.error((error as Error).message)
        }
    }

    const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
        setIsFilterInQuery(true)
        setPriceRange([+priceFrom, +priceTo])
        setIsPriceRangeChanged(true)
    }

    const applyFilters = async () => {
        setIsFilterInQuery(true)

        try {
            setSpinner(true)
            const priceFrom = Math.ceil(priceRange[0])
            const priceTo = Math.ceil(priceRange[1])
            const priceQuery =
                isPriceRangeChanged ?
                    `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

            const divans = divanManufactuters
                .filter((item) => item.checked)
                .map((item) => item.title)

            const encodedDivanQuery = encodeURIComponent(JSON.stringify(divans))
            const divanQuery = `&divans=${encodedDivanQuery}`
            const initialPage = currentPage > 0 ? 0 : currentPage

            if (divans.length && isPriceRangeChanged) {
                updateParamsAndFilers({
                    divans: encodedDivanQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1
                }, `${initialPage}${priceQuery}${divanQuery}`,
                    router
                )
                return
            }

            if (isPriceRangeChanged) {
                updateParamsAndFilers({
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1
                }, `${initialPage}${priceQuery}`,
                    router
                )
            }

            if (divans.length) {
                updateParamsAndFilers({
                    divans: encodedDivanQuery,
                    offset: initialPage + 1
                }, `${initialPage}${divanQuery}`,
                    router
                )
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
            {isMobile ?
                (<CatalogFiltersMobile
                    closePopup={closePopup}
                    spinner={spinner}
                    applyFilters={applyFilters}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    resetFilters={resetFilters}
                    filtersMobileOpen={filtersMobileOpen}
                /> ): (<CatalogFiltersDesktop
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    spinner={spinner}
                    resetFilters={resetFilters}
                    applyFilters={applyFilters}
                />)}
        </>
    )
}



export default CatalogFilters