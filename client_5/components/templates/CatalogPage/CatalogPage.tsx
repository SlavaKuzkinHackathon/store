
import { AnimatePresence } from 'framer-motion'
import ManufacturersBlock from '../../modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '../../modules/CatalogPage/FilterSelect'
import { useEffect, useState } from 'react'
import { getDivansFx } from '../../../app/api/divans'
import { $divans, $divansManufactures, $filteredDivans, setDivans, setDivansManufacturers, updateDivansManufacturers } from '../../../context/divans'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import CatalogItem from '../../modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '../../../types/catalog'
import { useRouter } from 'next/router'
import { IDivans } from '../../../types/divans'
import CatalogFilters from '../../modules/CatalogPage/CatalogFiltres'
import { usePopup } from '../../../hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '../../Elements/FilterSvg/FilterSvg'
import skeletonStyles from '../../../src/styles/skeleton/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
    const divanS = useStore($divans)
    const filteredDivans = useStore($filteredDivans)
    const [spinner, setSpinner] = useState(false)
    const [priceRange, setPriceRange] = useState([1000, 9000])
    const [isFilterInQuery, setIsFilterInQuery] = useState(false)
    const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
    const pagesCount = Math.ceil(divanS.count / 20)
    const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
    const [currentPage, setCurrentPage] = useState(isValidOffset ? +query.offset - 1 : 0)
    const router = useRouter()
    const divanManufactuters = useStore($divansManufactures)
    const isAnyDivanManufacturerChecked = divanManufactuters.some((item) => item.checked)
    const resetFilterBtnDisabled = !(isPriceRangeChanged || isAnyDivanManufacturerChecked)

    const { toggleOpen, open, closePopup } = usePopup()

    useEffect(() => {
        loadDivans()
    }, [filteredDivans, isFilterInQuery])

    const loadDivans = async () => {
        try {
            setSpinner(true)
            const data = await getDivansFx('/divans?limit=20&offset=0')

            if (!isValidOffset) {
                router.replace({
                    query: {
                        offset: 1
                    }
                })
                resetPagination(data)
                return
            }

            if (isValidOffset) {
                if (+query.offset > Math.ceil(data.count / 20)) {
                    router.push({
                        query: {
                            ...query,
                            offset: 1
                        }
                    }, undefined, { shallow: true }
                    )
                    setCurrentPage(0)
                    setDivans(isFilterInQuery ? filteredDivans : data)
                    return
                }
                const offset = +query.offset - 1
                const result = await getDivansFx(`/divans?limit=20&offset=${offset}`)

                setCurrentPage(offset)
                setDivans(isFilterInQuery ? filteredDivans : result)
                return
            }
            setCurrentPage(0)
            setDivans(isFilterInQuery ? filteredDivans : data)

        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setTimeout(() => setSpinner(false), 1000)
        }
    }

    const resetPagination = (data: IDivans) => {
        setCurrentPage(0)
        setDivans(data)
    }

    const handlePageChange = async ({ selected }: { selected: number }) => {
        try {
            setSpinner(true)
            const data = await getDivansFx('/divans?limit=20&offset=0')

            if (selected > pagesCount) {
                resetPagination(isFilterInQuery ? filteredDivans : data)
                return
            }

            if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
                resetPagination(isFilterInQuery ? filteredDivans : data)
                return
            }

            const {
                isValidDivansQuery,
                isValidPriceQuery,
            } = checkQueryParams(router)

            const result = await getDivansFx(
                `/divans?limit=20&offset=${selected}${isFilterInQuery && isValidDivansQuery
                    ? `&divans=${router.query.divans}`
                    : ''
                }${isFilterInQuery && isValidPriceQuery
                    ? `&priceFrom=${router.query.priceFrom}
                    &priceTo=${router.query.priceTo}` : ''
                }`
            )

            router.push({
                query: {
                    ...router.query,
                    offset: selected + 1
                },
            }, undefined,
                { shallow: true }
            )
            setCurrentPage(selected)
            setDivans(result)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setTimeout(() => setSpinner(false), 1000)
        }
    }

    const resetFilters = async () => {
        try {
            const data = await getDivansFx('/divans?limit=20&offset=0')
            const params = router.query

            delete params.divans
            delete params.priceFrom
            delete params.priceTo
            params.first = 'cheap'

            router.push({ query: { ...params } }, undefined, { shallow: true })

            setDivansManufacturers(
                divanManufactuters.map((item) => ({ ...item, checked: false }))
            )
            setDivans(data)
            setPriceRange([1000, 9000])
            setIsPriceRangeChanged(false)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <section className={styles.catalog}>
            <div className={`container ${styles.catalog__container}`}>
                <div>
                    <h2 className={styles.catalog__title}>Каталог диванов</h2>
                </div>
                <div className={styles.catalog__top}>
                    <AnimatePresence>
                        {isAnyDivanManufacturerChecked &&
                            <ManufacturersBlock
                                event={updateDivansManufacturers}
                                manufacturerList={divanManufactuters}
                                title='Производитель диванов: '
                            />}
                    </AnimatePresence>
                    <div className={styles.catalog__top__inner}>
                        <button className={styles.catalog__top__reset}
                            disabled={resetFilterBtnDisabled}
                            onClick={resetFilters}
                        >
                            Сбросить фильтр
                        </button>
                        <button
                            className={styles.catalog__top__mobile_btn}
                            onClick={toggleOpen}
                        >
                            <span className={styles.catalog__top__mobile_btn__svg}>
                                <FilterSvg />
                            </span>
                            <span className={styles.catalog__top__mobile_btn__text}>
                                Фильтр
                            </span>
                        </button>
                        <FilterSelect setSpinner={setSpinner} />
                    </div>
                </div>
                <div className={styles.catalog__bottom}>
                    <div className={styles.catalog__bottom__inner}>
                        <CatalogFilters
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            resetFilterBtnDisabled={resetFilterBtnDisabled}
                            resetFilters={resetFilters}
                            isPriceRangeChanged={isPriceRangeChanged}
                            currentPage={currentPage}
                            setIsFilterInQuery={setIsFilterInQuery}
                            closePopup={closePopup}
                            filtersMobileOpen={open}
                        />
                        {spinner ? (
                            <ul className={skeletonStyles.skeleton}>
                                {Array.from(new Array(20)).map((item) => (
                                    <li key={item} className={skeletonStyles.skeleton__item} >
                                        <div className={skeletonStyles.skeleton__item__light} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className={styles.catalog__list}>
                                {divanS.rows?.length ? divanS.rows.map((item) => (
                                    <CatalogItem item={item} key={item.id} />
                                )) : (
                                    <span> Список товаров пуст.....</span>
                                )}
                            </ul>
                        )}
                    </div>
                    <ReactPaginate
                        containerClassName={styles.catalog__bottom__list}
                        pageClassName={styles.catalog__bottom__list__item}
                        pageLinkClassName={styles.catalog__bottom__list__item__link}
                        previousClassName={styles.catalog__bottom__list__prev}
                        nextClassName={styles.catalog__bottom__list__next}
                        breakClassName={styles.catalog__bottom__list__break}
                        breakLinkClassName={styles.catalog__bottom__list__break__link}
                        breakLabel='...'
                        pageCount={pagesCount}
                        forcePage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}



export default CatalogPage