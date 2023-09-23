import AuthPage from "./authPage";
import SEO from "../../../components/SEO";
import useRedirectByUserCheck from "../../../hooks/useRedirectByUserCheck";


function Auth() {
    const { shouldLoadContent } = useRedirectByUserCheck(true)

    return (
        <>
            
            <SEO
                title="Войти в личный кабинет"
                description="Интернет-магазин диванов в городе Новосибирске Ваша Мебель"
                keywords="недорогие диваны от производителя"
            />
              <AuthPage />
        </>
    )
}

export default Auth