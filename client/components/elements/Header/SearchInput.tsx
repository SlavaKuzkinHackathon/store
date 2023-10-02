import { $mode } from "@/context/mode"
import { SelectOptionType } from "@/types/common"
import { useStore } from "effector-react"
import { useState } from "react"
import Select from "react-select"

const SearchInput =() => {
    const mode = useStore($mode)
    const[searchOption, setSearchOoption] = useState<SelectOptionType>(null)

    return(
        <Select placeholder='Я ищу...'/>

    )
}

export default SearchInput