import { useMediaQuery } from "../../../hooks/useMediaQuery"
import styles from '../../../src/styles/contacts/index.module.scss'
import MailSvg from "../../Elements/MailSvg/MailSvg"
import FeedbackForm from "../../modules/FeedbackForm/FeedBackForm"



const ContactsPage = ({ isWholesaleBuyersPage = false }) => {

   const isMobile560 = useMediaQuery(560)

   return (
      <section className={styles.contacts}>
         <div className="container">
            <h2 className={styles.contacts__title}>
               {isWholesaleBuyersPage ? 'Оптовым покупателям' : 'Контакты'}
            </h2>
            <div className={styles.contacts__inner}>
               {isWholesaleBuyersPage ? (
                  <div className={styles.contacts__list}>
                     <p>
                        <span>
                           Условия оптовых заказов решаются индивидуально по телефону:{' '}
                        </span>
                        <span>+7 (913) 913-11-11</span>
                     </p>
                     <p>
                        Либо опишите суть заказа в форме обртной связи и мы с вами
                        свяжемся.
                     </p>
                  </div>
               ) : (
                  <ul className={styles.contacts__list}>
                     <li className={styles.contacts__list__title}>
                        <h3>
                           Магазин фурнитуры для изготовления диванов
                        </h3>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>Офис:</span>
                        <span> г. Новосибирск, ул. ... д....</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>Склад:</span>
                        <span> г. Новосибирск, ул. ... д....</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>График работы офиса:</span>
                        <span> пн-пс: с 8:00 до 22:00</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>Наш контактный телефон:</span>
                        <span> +7(913) 913-11-11</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>Время приемок завок:</span>
                        <span> Пн-Вс: с 8:00 до 22:00</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>Прием заказов электронным способом на сайте:</span>
                        <span> круглосуточно</span>
                     </li>
                     <li className={styles.contacts__list__item}>
                        <span>E-mail:</span>
                        <span className={styles.contacts__list__item__mail}>
                           {!isMobile560 && <MailSvg />}{' '}
                           <span>jess.888@yandex.ru</span>
                        </span>
                     </li>
                  </ul>
               )}
               <FeedbackForm />
            </div>
         </div>
      </section>
   )
}

export default ContactsPage


