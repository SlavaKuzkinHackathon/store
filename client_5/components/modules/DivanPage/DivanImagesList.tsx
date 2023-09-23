/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useStore } from 'effector-react'
import { $divan } from '../../../context/divan'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import DivanImagesItem from './DivanImagesItem'
import DivanSlider from './DivanSlider'
import styles from '../../../src/styles/divan/index.module.scss'

const DivanImagesList = () => {

    const divan = useStore($divan)
    const isMobile = useMediaQuery(850)

    const images = divan.images ?
        (JSON.parse(divan.images) as string[])
        : []

    const [currentImgSrc, setCurrentImgSrc] = useState('')

    return (
        <div className={styles.divan__images}>
            {isMobile ?
                <DivanSlider
                    images={images}
                /> :
                <>
                    <div className={styles.divan__images__main}>
                        <img src={currentImgSrc || images[0]} alt={divan.name} />
                    </div>
                    <ul className={styles.divan__images__list}>
                        {images.map((item, i) =>
                            <DivanImagesItem key={i}
                                alt={`image-${i + 1}`}
                                callback={setCurrentImgSrc}
                                src={item}
                            />
                        )}
                    </ul>
                </>}
        </div>
    )
}

export default DivanImagesList