import Head from 'next/head'
import AboutPage from "@/components/templates/AboutPage/AboutPage"


function About() {
    //const getDefaultTextGenerator = useCallback(() => 'О компании', [])
    //const getTextGenerator = useCallback((param: string) => ({}[param]), [])
    return (
        <>
            <Head>
                <title>Ваша мебель | O компании</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <AboutPage />
        </>
    )
}
export default About