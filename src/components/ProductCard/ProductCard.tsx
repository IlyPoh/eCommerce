// store
import { useGetProductsQuery } from '../../store/API/api';
import { Button } from '../UI/Button/Button';

// styles
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  id: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id }) => {
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
          <Button classes="btn btn-small btn-green" text="Buy now" />
        </div>
      </div>
    </>
  );
};
