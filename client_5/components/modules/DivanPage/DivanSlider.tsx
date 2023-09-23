/* eslint-disable @next/next/no-img-element */
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import styles from '../../../src/styles/divan/index.module.scss'


const DivanSlider = ({ images }: { images: string[] }) => {

    const isMobile700 = useMediaQuery(700)
    const isMobile530 = useMediaQuery(530)

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
        <Slider {...settings} className={styles.divan__slider}>
            {images.map((src, i) => (
                <div
                    className={styles.divan__slide}
                    key={i}
                    style={{
                        width: isMobile530 ?
                            228 : isMobile700 ?
                                360 : 593
                    }}
                >
                    <img src={src} alt={`image${i + 1}`} />
                </div>
            ))}
        </Slider>
    )
}

export default DivanSlider