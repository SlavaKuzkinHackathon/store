import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/contacts/index.module.scss'
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm'

const ServicesPage = ({ isWholesaleBuyersPage = false }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          {isWholesaleBuyersPage ? 'Ремонт и перетяжка мягкой мебели' : 'Контакты'}
        </h2>
        <div className={styles.contacts__inner}>
          {isWholesaleBuyersPage ? (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                <span>
                  Ремонт и перетяжка мебели недорого:{' '}
                </span>
                <span>+7 (913) 913-55-47</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обратной связи и мы с вами
                свяжемся.
              </p>
            </div>
          ) : (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                <span>
                  Изготовление мягкой мебели по индивидуальным проектам:{' '}
                </span>
                <span>+7 (913) 913-55-47</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обратной связи и мы с вами
                свяжемся.
              </p>
            </div>
          )}
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
