import Footer from "../Footer/footer";
import Header from "../Header/header";

export interface props {
    children?: React.ReactNode; }

const Layout = ({ children }: props) => {
    
    return (
        <>
            {<main>
                <Header/>
                {children}
                <Footer />
            </main>}
        </>
    )
}


export default Layout