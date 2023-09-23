/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {useMediaQuery} from '../../../hooks/useMediaQuery'
import { useEffect } from 'react'
import styles from '../../../src/styles/dashboard/index.module.scss'


const DivansSlider = () => {
    const isMedia800 = useMediaQuery(800)
    const divansPhotoItem = [
        {id: 1, img: '/img/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 2, img: '/img/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 3, img: '/img/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 4, img: '/img/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 5, img: '/img/1_8.png', alt: 'Модельный ряд "Селена"'},
        {id: 6, img: '/img/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 7, img: '/img/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 8, img: '/img/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 9, img: '/img/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 10, img: '/img/1_8.png', alt: 'Модельный ряд "Селена"'},
        {id: 11, img: '/img/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 12, img: '/img/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 13, img: '/img/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 14, img: '/img/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 15, img: '/img/1_8.png', alt: 'Модельный ряд "Селена"'},
    ]

   useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__divansPhSlide__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia800 ? '90px' : '120px'
  }, [isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    speed: 500,
  }

  
  return (
    <Slider {...settings} className={styles.dashboard__divansPhSlide__slider}>
      {divansPhotoItem.map((item) => (
        <div
          className={styles.dashboard__divansPhSlide__slide} 
          key={item.id}
          style={{ width: isMedia800 ? 135: 190 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default DivansSlider

