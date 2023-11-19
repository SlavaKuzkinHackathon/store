import CategoriesAdmin from '@/components/admin/Categories_admin'
import styles from '@/styles/admin/index.module.scss'
import { useState } from 'react'
import AdminProductsPage from './products'
import { NextPage } from 'next'

const Admin: NextPage = () => {
  const [isActive, setIsActive] = useState('categories')

  return (
    <>
      <section className={styles.admin}>
        <div className={styles.header}>
          <h1 className={styles.name}>Админ-панель</h1>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                isActive === 'categories' && styles.tab_active
              }`}
              onClick={() => setIsActive('categories')}
            >
              Категории
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'products' && styles.tab_active
              }`}
              onClick={() => setIsActive('products')}
            >
              Товары
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'orders' && styles.tab_active
              }`}
              onClick={() => setIsActive('orders')}
            >
              Заказы
            </button>
            <button
              className={`${styles.tab} ${
                isActive === 'users' && styles.tab_active
              }`}
              onClick={() => setIsActive('users')}
            >
              Пользователи
            </button>
          </div>
        </div>
        {isActive === 'categories' && <CategoriesAdmin />}
        {isActive === 'products' && <AdminProductsPage />}
      </section>
    </>
  )
}

export default Admin