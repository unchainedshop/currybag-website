import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CatagoriesList from '../../modules/assortment/components/CatagoriesList';
import useAssortmentProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmetBreadcrumbs from '../../modules/assortment/components/AssortmetBreadcrumbs';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';
import MetaTags from '../../modules/common/components/MetaTags';
import useCatagoriesTree from '../../modules/assortment/hooks/useCatagoriesTree';

const CatagoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs[slugs.length - 1];
  const [currentUrl, setcurrentUrl] = useState('');

  const { assortmentTree } = useCatagoriesTree({
    slugs: slug,
    includeLeaves: true,
  });

  const { assortment: { texts } = {}, products, paths } = useAssortmentProducts(
    {
      slugs: slug,
      includeLeaves: true,
    },
  );

  const assortmentPaths = getAssortmentPath(paths);

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={texts?.title}
        description={texts?.description}
        url={currentUrl}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CatagoriesList
              assortment={assortmentTree.children}
              currentPath={slugs.join('/')}
            />
          </div>
          <div className="col-6">
            <div>
              <AssortmetBreadcrumbs
                paths={assortmentPaths}
                currentAssortment={texts}
              />
            </div>
            <div>
              <h2>{texts?.title}</h2>
              <span>{texts?.subtitle}</span>
              <p>{texts?.description}</p>
            </div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatagoryDetail;
