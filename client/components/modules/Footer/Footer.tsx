import Link from 'next/link';
import styles from '@/styles/footer/index.module.scss'


const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Link href='/'>
            <img src="/img/logo.svg" alt="лого" className={`logo ${styles.logo_footer}`} width="120" height="60" />
          </Link>
          <p className={styles.text}>Фабрика мягкой мебели &copy; 1999 - {new Date().getFullYear()}</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.column_head}>КАТЕГОРИИ</h3>
          <Link href={'/'} className="link">Главная</Link>
          <Link href={'/catalog'} className="link">Каталог</Link>
          <Link href={''} className="link">Изготовление на заказ</Link>
        </div>

        <div className={styles.column}>
          <h3 className={styles.column_head}>СЕРВИС</h3>
          <Link className="link" href={'/shiping-payment'}>Доставка и оплата</Link>
          <Link className="link" href={'/wholesale-buyers'}>Оптовым покупателям</Link>
          <Link href='/about' className="link">О нас</Link>
        </div>

        <div className={styles.column}>
          <h3 className={styles.column_head}>КОНТАКТЫ</h3>
          <Link href="tel:+79139135547" className="link">+7(913) 913-11-11</Link>
          <Link href="/contacts" className="link">Адреса салонов</Link>
          <Link href="mailto:mebel-petrova@mail.ru" className="link">Написать нам</Link>


          <nav className={styles.icons}>
            <ul className={styles.icons__links}>
              <li>
                <Link href='#'>
                  <img className={styles.icon} src="/img/whatsapp.svg" width="25" height="25" alt="WhatsApp" />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <img className={styles.icon} src="/img/telegram.svg" width="25" height="25" alt="Telegram" />
                </Link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </section>

  );
}
export default Footer