import React, { useCallback } from "react"
import SEO from "../../../components/SEO"
import AboutPage from "../../../components/templates/AboutPage/AboutPage"
import Breadcrumbs from "../../../components/modules/Breadcrumbs/Breadcrumbs"

function About() {
    const getDefaultTextGenerator = useCallback(() => 'О компании', [])
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])
    return (
        <>
            <SEO
                title="О компании | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя" />

            <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
            />
            <AboutPage />
        </>
    )
}
export default About