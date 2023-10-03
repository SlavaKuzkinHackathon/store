import { $mode } from '@/context/mode'
import { controlStyles, inputStyles, menuStyles, optionStyles } from '@/styles/searchInput'
import { SelectOptionType } from '@/types/common'
import { useStore } from 'effector-react'
import { useState } from 'react'
import Select from 'react-select'
import { defaultStyles } from 'react-select/dist/declarations/src/styles'

const SearchInput = () => {
  const mode = useStore($mode)
  const [searchOption, setSearchOoption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOoption(selectedOption)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
        control: (defaultStyles) =>({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) =>({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222'
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode)
        })
      }}
      isClearable={true}
      openMenuOnClick={false}
       options = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item) => ({value: item, label: item}))}
      instanceId="long-value-select"
    />
  )
}

export default SearchInput
