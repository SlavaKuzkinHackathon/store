import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="Ваша Мебель" content="Купить мягкую мебель от производителя Ваша Мебель в Новосибирске недорого | МЯГКАЯ МЕБЕЛЬ ОТ ПРОИЗВОДИТЕЛЯ Ваша Мебель" />
      <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;