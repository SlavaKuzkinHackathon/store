import SEO from "../../../components/SEO"
import { homeConfig } from "@/utils/config"
import useRedirectByUserCheck from "../../../hooks/useRedirectByUserCheck"
import CatalogPage from "../../../components/templates/CatalogPage/CatalogPage"
import { IQueryParams } from "../../../types/catalog"
import Breadcrumbs from "../../../components/modules/Breadcrumbs/Breadcrumbs"
import { useCallback } from "react"

function Catalog({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  const getDefaultTextGenerator = useCallback(() => 'Каталог', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <SEO
        title="Каталог | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель"
        description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
        keywords="недорогие диваны от производителя"
      />
      {/* <SEO {...homeConfig} />  */}
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />

      <CatalogPage query={query} />
      <div className="overlay" />
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } }
  }
}

export default Catalog