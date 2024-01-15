// IMPORTS
// components
import { Link } from 'react-router-dom';

// store
import { useGetProductsQuery } from '@/store/API/storeApi';

// utils
import { firstLettertoUppercase } from '@/utils/helpers/string';

// types
import { EView } from '@/types';
import { IProduct } from '@/types/store';

// styles
import styles from './ProductItem.module.scss';

// TYPES
interface ProductItemProps {
  id?: number;
  data?: IProduct;
  view?: EView;
}

// FUNCTIONS
// renders
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

const renderNoRating = () => {
  return <span className={styles['no-rating']}>No rating</span>;
};

const renderDiscountOnImage = (discount: { discount_percent: number }) => {
  return (
    <div className={`tag tag-green ${styles['discount']}`}>
      - {discount.discount_percent} %
    </div>
  );
};

const renderPrice = (price: number) => {
  return (
    <div className={styles['prices']}>
      <div className={styles['price']}>{price} USD</div>
    </div>
  );
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
          <div className={`${styles['value']} ${getClassName(!!green)}`}>
            {value}
          </div>
        </div>
      ))}
    </>
  );
};

const renderPriceWithDiscount = (finalPrice: number, price: number) => {
  return (
    <div className={styles['prices']}>
      <div className={styles['price']}>{finalPrice} USD</div>
      <div className={styles['old-price']}>{price}</div>
    </div>
  );
};

// button view
const buttonListView = (data: IProduct) => {
  return (
    <Link
      className="btn btn-small btn-green"
      to={data ? getProductLink(data) : '/'}
    >
      Buy Now
    </Link>
  );
};

const buttonGridView = (data: IProduct) => {
  return (
    <Link
      className="btn btn-medium btn-green"
      to={data ? getProductLink(data) : '/'}
    >
      Product Detail <i className="icon-chevron-right"></i>
    </Link>
  );
};

// other functions
const shippingText = () => {
  return (
    <div className={styles['shipping']}>
      <div className={styles['title']}>Free Shipping</div>
      <div className={styles['text']}>Delivery in 1 day</div>
    </div>
  );
};

const getProductLink = (data: IProduct) => {
  const { category, subcategory, id } = data;
  return `/products/${category}/${subcategory}/${id}`;
};

const getClassName = (isGreen: boolean) => (isGreen ? styles['green'] : '');

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
  const productInfo = data ?? productFromFetch;

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
        {view === EView.LIST && (
          <>
            <div className={styles['rating']}>
              {productInfo.rating.value == null
                ? renderNoRating()
                : renderRating(productInfo.rating.value)}
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
          ? renderPriceWithDiscount(
              productInfo.discount.final_price,
              productInfo.price
            )
          : renderPrice(productInfo.price)}
        {view === EView.LIST && shippingText()}
        {view == EView.GRID
          ? buttonListView(productInfo)
          : buttonGridView(productInfo)}
      </div>
    </div>
  );
};
