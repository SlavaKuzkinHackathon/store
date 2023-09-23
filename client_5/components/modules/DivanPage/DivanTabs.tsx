/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $divan } from '../../../context/divan'
import styles from '../../../src/styles/divan/index.module.scss'

const DivanTabs = () => {
  const divan = useStore($divan)
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }
divan
  const handleShowCompatibility = () => {
    setShowDescription(false)
    setShowCompatibility(true)
  }

  return (
    <div className={styles.divan__tabs}>
      <div className={styles.divan__tabs__controls}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.divan__tabs__content}
        >
          <h3
            className={styles.divan__tabs__content__title}
          >
            {divan.name}
          </h3>
          <p className={styles.divan__tabs__content__text}>
            {divan.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.divan__tabs__content}
        >
          <p className={styles.divan__tabs__content__text}>
            {divan.popularity}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default DivanTabs