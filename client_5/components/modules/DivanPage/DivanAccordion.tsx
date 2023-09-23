/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Accordion from '../../Elements/Accordion/Accordion'
import { IDivanAccordionProps } from '../../../types/divan'
import React from 'react'
import styles from '../../../src/styles/divan/index.module.scss'

const DivanAccordion = ({ children, title }: IDivanAccordionProps) => {

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${styles.divan__accordion__title}`
    )

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={styles.divan__accordion__title}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default DivanAccordion