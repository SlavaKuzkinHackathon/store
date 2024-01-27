import { useMediaQuery } from '@/hooks/useMediaQuery'
import React from 'react'


const CatalogFilters = () => {
    const isMobile = useMediaQuery(820)
    return (<>{isMobile ? <div/> : <div/>}</>)
}

export default CatalogFilters