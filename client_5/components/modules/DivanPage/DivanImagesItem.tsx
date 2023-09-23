/* eslint-disable @next/next/no-img-element */

import { IDivanImagesItemProps } from '../../../types/divan'
import styles from '../../../src/styles/divan/index.module.scss'


const DivanImagesItem = ({src, callback, alt}: IDivanImagesItemProps) => {

   const  changeMainImage = () => callback(src)

    return (
        <li className={styles.divan__images__list__item} onClick={changeMainImage}>
            <img src={src} alt={alt}/>
        </li>
    )
}

export default DivanImagesItem