import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import CatagoriesList from '../../modules/assortment/components/CatagoriesList';
import useAssortmentProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmentBreadcrumbs from '../../modules/assortment/components/AssortmentBreadcrumbs';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';
import MetaTags from '../../modules/common/components/MetaTags';
import useCatagoriesTree from '../../modules/assortment/hooks/useCatagoriesTree';
import LoadingItem from '../../modules/common/components/LoadingItem';
import getMediaUrl from '../../modules/common/utils/getMediaUrl';

const CatagoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs[slugs.length - 1];
  const [currentUrl, setcurrentUrl] = useState('');

  const { assortmentTree, loading: catagoryTreeLoading } = useCatagoriesTree({
    slugs: slug,
    includeLeaves: true,
  });

  const {
    assortment: { texts, media } = {},
    products,
    paths,
    loading: productsLoading,
  } = useAssortmentProducts({
    slugs: slug,
    includeLeaves: true,
  });

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
        imageUrl={getMediaUrl({ media })}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AssortmentBreadcrumbs
              paths={assortmentPaths}
              currentAssortment={texts}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            {catagoryTreeLoading ? (
              <LoadingItem />
            ) : (
              <CatagoriesList
                assortment={assortmentTree.children}
                currentPath={slugs.join('/')}
              />
            )}
          </div>
          <div className="col-md-8 col-lg-9">
            <div>
              <h1 className="mt-0">{texts?.title}</h1>
              <h2>{texts?.subtitle}</h2>
              {getMediaUrl({ media }) && (
                <Image
                  src={getMediaUrl({ media })}
                  alt={texts?.title}
                  layout="responsive"
                  objectFit="contain"
                  quality={100}
                  width="706px"
                  height="235px"
                />
              )}

              <p>{texts?.description}</p>
            </div>
            {productsLoading ? (
              <LoadingItem />
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatagoryDetail;
