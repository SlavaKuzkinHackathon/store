import SEO from "../../components/SEO"
import { homeConfig } from "@/utils/config"
import DashboardPage from "../../components/templates/DashboardPage/DashboardPage"
import useRedirectByUserCheck from "../../hooks/useRedirectByUserCheck"
import { useCallback } from "react"
import Breadcrumbs from "../../components/modules/Breadcrumbs/Breadcrumbs"

export default function Home() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  const getDefaultTextGenerator = useCallback(() => 'Главная', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

return (
    <>
   
      <SEO {...homeConfig} /> 
      <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
      
     {shouldLoadContent && <DashboardPage/>}
    </>
  )
}