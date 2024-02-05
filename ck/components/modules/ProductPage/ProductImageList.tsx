/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $productOne } from '@/context/productOne'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImagesItem from './ProductImagesItem'
import ProductSlider from './ProductSlider'
import styles from '@/styles/product/index.module.scss'

const PartImagesList = () => {
  const productOne = useStore($productOne)
  const isMobile = useMediaQuery(850)
  const images = productOne.image
    ? (JSON.parse(productOne.image) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <ProductSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={productOne.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <ProductImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
