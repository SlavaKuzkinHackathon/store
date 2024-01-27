import { getProductsPaginateFx } from '@/app/api/products'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ModelsBlock from '@/components/modules/CatalogPage/ModelsBlock'
import { $mode } from '@/context/mode'
import { $productsm, setProductsm } from '@/context/products'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IProduct, IProducts } from '@/types/productsm'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const products = useStore($productsm)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [spinner, setSpinner] = useState(false)
  const pageCount = Math.ceil(products.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const router = useRouter()

  useEffect(() => {
    loadProducts()
  }, [])

  console.log(products.rows);
  
  const loadProducts = async () => {
    try {
      setSpinner(true)
      const data = await getProductsPaginateFx(
        '/products/all?limit=20&offset=0'
      )
      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })
        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 3)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )
          setCurrentPage(0)
          setProductsm(data)
          return
        }
      }
      const offset = +query.offset - 1
      const result = await getProductsPaginateFx(
        `/products/all?limit=20&offset=${offset}`
      )

      setCurrentPage(offset)
      setProductsm(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: IProducts) => {
    setCurrentPage(0)
    setProductsm(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getProductsPaginateFx(
        '/products/all?limit=20&offset=0'
      )

      if (selected > pageCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const result = await getProductsPaginateFx(
        `/products/all?limit=20&offset=${selected}`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setProductsm(result)
    } catch (error) {}
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог Мягкой Mебели
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ModelsBlock title="Модели диванов" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}
            >
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div>Filters</div>
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {products.rows?.length ? (
                  products.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
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
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
