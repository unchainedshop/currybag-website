import { gql } from '@apollo/client';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    texts {
      _id
      title
      subtitle
      description
      slug
    }
    media {
      _id
      file {
        _id
        name
        url
      }
    }
    ... on SimpleProduct {
      simulatedPrice {
        _id
        isTaxable
        isNetPrice
        amount
        currency
      }
      dimensions {
        width
        height
        length
        weight
      }
    }
  }
`;

export default ProductFragment;