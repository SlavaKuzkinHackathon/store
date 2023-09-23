/* eslint-disable indent */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { $mode } from '../../../context/mode'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '../../../src/styles/searchInput'
import { IOption, SelectOptionType } from '../../../types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '../../../src/utils/selectContents'
import {
  $divans,
  setDivansCheapFirst,
  setDivansExpendensiveFirst,
  setDivansByPopularity,
} from '../../../context/divans'
import { useRouter } from 'next/router'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const divanS = useStore($divans)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (divanS.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Сначала дешевые')
          setDivansCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setDivansExpendensiveFirst()
          break
        case 'popular':
          updateCategoryOption('По популярности')
          setDivansByPopularity()
          break
        default:
          updateCategoryOption('Сначала дешевые')
          setDivansCheapFirst()
          break
      }
    }
  }, [divanS.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        setDivansCheapFirst()
        updateRoteParam('cheap')
        break
      case 'Сначала дорогие':
        setDivansExpendensiveFirst()
        updateRoteParam('expensive')
        break
      case 'По популярности':
        setDivansByPopularity()
        updateRoteParam('popular')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect