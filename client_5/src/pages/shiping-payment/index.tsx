import { useCallback } from "react"
import SEO from "../../../components/SEO"
import ShipingPayment from "../../../components/templates/ShipingPayment/ShipingPayment"
import Breadcrumbs from "../../../components/modules/Breadcrumbs/Breadcrumbs"

function ShipingPaymentPage() {
    const getDefaultTextGenerator = useCallback(() => 'Доставка и оплата', [])
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])

    return (
        <>
            <SEO
                title="Доставка и оплата | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
            {/* <SEO {...homeConfig} />  */}

            <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
            />

            <ShipingPayment />
            <div className="overlay" />
        </>
    )
}

export default ShipingPaymentPage