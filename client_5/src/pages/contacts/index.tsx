import { useCallback } from "react";
import SEO from "../../../components/SEO";
import ContactsPage from "../../../components/templates/ContactsPage/ContactsPage";
import Breadcrumbs from "../../../components/modules/Breadcrumbs/Breadcrumbs";

function Contacts() {
    const getDefaultTextGenerator = useCallback(() => 'Контакты', [])
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])

    return (
        <>
            <SEO
                title="Контакты | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
            {/* <SEO {...homeConfig} />  */}
            <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
            />
            <ContactsPage />
        </>
    )
}
export default Contacts