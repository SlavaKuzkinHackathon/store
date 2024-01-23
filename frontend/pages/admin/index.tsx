import styles from '@/styles/admin/index.module.scss'
import { useState } from 'react'
import AdminProductsPage from './products'
import { NextPage } from 'next'
import useRedirectByAdmin from '@/hooks/useRedirectByAdmin'

const Admin: NextPage = () => {
  const { shouldAccessAllow } = useRedirectByAdmin(true)
  const [isActive, setIsActive] = useState('products')

  return (
    <>
      {shouldAccessAllow && (
        <section className={styles.admin}>
          <div className={styles.header}>
            <h1 className={styles.name}>Админ-панель</h1>

            <div className={styles.tabs}>
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
          {isActive === 'products' && <AdminProductsPage />}
        </section>
      )}
    </>
  )
}

export default Admin
