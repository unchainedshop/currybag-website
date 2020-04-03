import { useRouter } from 'next/router';
import useProductDetailQuery from '../../modules/products/hooks/useProductDetailQuery';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';

const Detail = (props) => {
  const router = useRouter();

  const { product } = useProductDetailQuery({ slug: router.query.slug });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={getProductMediaUrl(product)} />
        </div>
        <div className="col-md-6">
          <h2 className="px-2 mt-md-0">{product?.texts?.title}</h2>
          <div className="p-2">
            <h3 className="my-0">
              CHF {product?.simulatedPrice?.price?.amount / 100}.-
            </h3>
            <h4 className="mb-0">{product?.texts?.subtitle}</h4>
            <p>{product?.texts?.description}</p>
            <p>{product?.dimensions?.weight * 1000} Gramm</p>
          </div>
          <button
            type="button"
            className="button button--primary button--big  text-uppercase"
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;