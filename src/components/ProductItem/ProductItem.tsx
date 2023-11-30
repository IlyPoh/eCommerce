// IMPORTS
// components
import { Link } from 'react-router-dom';

// store
import { useGetProductsQuery } from '../../store/API/storeApi';

// styles
import styles from './ProductItem.module.scss';
import { EView } from '../../types';
import { IProduct } from '../../types/store';
import { firstLettertoUppercase } from '../../utils/helpers';

// TYPES
interface ProductItemProps {
  id?: number;
  data?: IProduct;
  view?: EView;
}

// COMPONENT
export const ProductItem: React.FC<ProductItemProps> = ({
  id,
  data,
  view = EView.GRID,
}) => {
  const fetchData = useGetProductsQuery({ id: id });
  const productFromFetch = fetchData.data
    ? fetchData.data.productsData[0]
    : null;
  console.log('🚀 ~ file: ProductItem.tsx:28 ~ fetchData:', fetchData);
  const productInfo = data ?? productFromFetch;

  const renderDiscountOnImage = (discount: { discount_percent: number }) => {
    return (
      <div className={`tag tag-green ${styles['discount']}`}>
        - {discount.discount_percent} %
      </div>
    );
  };

  const renderRating = (rating: number) => {
    const roundedRating = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating)
        stars.push(<i key={i} className="icon-actions-star-full"></i>);
      else
        stars.push(
          <i key={i} className={`icon-actions-star ${styles['no-rating']}`}></i>
        );
    }

    return stars;
  };

  const renderInfoItem = (
    item: { [key: string]: string | number },
    green?: boolean
  ) => {
    return (
      <>
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className={styles['info-item']}>
            <div className={styles['text']}>{firstLettertoUppercase(key)}</div>
            <div
              className={`${styles['value']} ${green ? styles['green'] : null}`}
            >
              {value}
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderPrice = (price: number) => {
    return (
      <div className={styles['prices']}>
        <div className={styles['price']}>{price} USD</div>
      </div>
    );
  };

  const renderPriceWithDiscount = (discount: { final_price: number }) => {
    return (
      <div className={styles['prices']}>
        <div className={styles['price']}>{discount.final_price} USD</div>
        <div className={styles['old-price']}>{productInfo?.price}</div>
      </div>
    );
  };

  const shippingText = () => {
    return (
      <div className={styles['shipping']}>
        <div className={styles['title']}>Free Shipping</div>
        <div className={styles['text']}>Delivery in 1 day</div>
      </div>
    );
  };

  const buttonListView = (id: number) => {
    return (
      <Link className="btn btn-small btn-green" to={`/product/${id}`}>
        Buy Now
      </Link>
    );
  };

  const buttonGridView = (id: number) => {
    return (
      <Link className="btn btn-medium btn-green" to={`/product/${id}`}>
        Product Detail <i className="icon-chevron-right"></i>
      </Link>
    );
  };

  if (!productInfo) return null;

  return (
    <div className={`${styles['card']} ${styles[view]}`}>
      <div className={styles['image']}>
        {productInfo.discount && renderDiscountOnImage(productInfo.discount)}
        <img
          src={productInfo.image_urls[0]}
          width={280}
          alt={productInfo.name}
        />
      </div>
      <div className={styles['body']}>
        <div className={styles['title']}>{productInfo.name}</div>
        <div className={styles['subtitle']} title={productInfo.description}>
          {productInfo.description}
        </div>
        {view == EView.LIST && (
          <>
            <div className={styles['rating']}>
              {productInfo.rating == null ? (
                <div className={styles['no-rating']}>No rating</div>
              ) : (
                renderRating(productInfo.rating)
              )}
            </div>
            <div className={styles['info']}>
              <div className={styles['info-item']}>
                {productInfo.freshness && (
                  <>
                    <div className={styles['info-title']}>Freshness</div>
                    <div
                      className={`${styles['info-text']} ${styles['green']}`}
                    >
                      {productInfo.freshness ? 'New' : 'Old'}
                    </div>
                  </>
                )}
              </div>
              {productInfo.country &&
                renderInfoItem({ country: productInfo.country })}
              {productInfo.delivery &&
                renderInfoItem({ delivery: productInfo.delivery })}
              {productInfo.stock !== null &&
                renderInfoItem({ stock: productInfo.stock }, true)}
            </div>
          </>
        )}
      </div>
      <div className={styles['footer']}>
        {productInfo.discount
          ? renderPriceWithDiscount(productInfo.discount)
          : renderPrice(productInfo.price)}
        {view == EView.LIST && shippingText()}
        {view == EView.GRID
          ? buttonListView(productInfo.id)
          : buttonGridView(productInfo.id)}
      </div>
    </div>
  );
};
