import CategoriesAdmin from '@/components/admin/Categories_admin'
import styles from '@/styles/admin/index.module.scss'
import { useState } from 'react'

export default function Admin() {
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
                isActive === 'goods' && styles.tab_active
              }`}
              onClick={() => setIsActive('goods')}
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
      </section>
    </>
  )
}
