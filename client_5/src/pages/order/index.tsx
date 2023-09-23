import { useCallback } from "react"
import SEO from "../../../components/SEO"
import OrderPage from "../../../components/templates/OrderPage/OrderPage"
import Breadcrumbs from "../../../components/modules/Breadcrumbs/Breadcrumbs"

function Order() {
    const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])

    return (
        <>
            <SEO
                title="Оформление заказа | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
            {/* <SEO {...homeConfig} />  */}
            <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
            />

            <OrderPage />

            <div className="overlay" />
        </>
    )
}

export default Order