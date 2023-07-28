// IMPORTS
// components
import { Link } from 'react-router-dom';

// store
import { useGetProductsQuery } from '../../store/API/storeApi';

// styles
import styles from './ProductItem.module.scss';

// TYPES
interface ProductItemProps {
  id: number;
}

// COMPONENT
export const ProductItem: React.FC<ProductItemProps> = ({ id }) => {
  const { data } = useGetProductsQuery({ id: id });
  const productInfo = data ? data[0] : null;

  if (!data) return null;

  return (
    <>
      <div className={styles['card']}>
        <div className={styles['image']}>
          {productInfo?.discount && (
            <>
              <div className={styles['discount']}>
                - {productInfo?.discount.discount_percent} %
              </div>
            </>
          )}
          <img
            src={productInfo?.image_urls[0]}
            width={250}
            alt={productInfo?.name}
          />
        </div>
        <div className={styles['body']}>
          <div className={styles['title']}>{productInfo?.name}</div>
          <div className={styles['subtitle']}>{productInfo?.description}</div>
        </div>
        <div className={styles['footer']}>
          {productInfo?.discount ? (
            <div className={styles['prices']}>
              <div className={styles['price']}>
                {productInfo?.discount.final_price} USD
              </div>
              <div className={styles['old-price']}>{productInfo?.price}</div>
            </div>
          ) : (
            <div className={styles['prices']}>
              <div className={styles['price']}>{productInfo?.price} USD</div>
            </div>
          )}
          <Link
            className="btn btn-small btn-green"
            to={`/product/${productInfo?.id}`}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </>
  );
};
