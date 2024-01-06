// IMPORTS
// libraries
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// types
import { IProduct } from '@customTypes/store';

// store
import { setBreadcrumbs } from '@store/Slices/pageSlice';
import { useGetProductsQuery } from '@store/API/storeApi';

// utils
import { useAppDispatch } from '@hooks/index';

// styles
import styles from './Product.module.scss';

// FUNCTIONS
// renders
const renderImages = (images: string[]) => {
  return images.map((image) => (
    <img key={image} className={styles['image']} src={image} alt="product" />
  ));
};

const renderDiscountTag = (discount: number) => {
  return <span className="tag tag-green">-{discount}%</span>;
};

const renderRating = (ratingValue: number | null, ratingCount: number) => {
  const maxRating = 5;

  const renderStars = (value: number) => {
    value = Math.floor(value);

    const stars = Array.from({ length: maxRating }, (_, index) => (
      <i
        className={
          index < value
            ? `icon-actions-star-full ${styles['full']}`
            : `icon-actions-star ${styles['empty']}`
        }
        key={index}
      ></i>
    ));

    return stars;
  };

  const renderRatingCount = (count: number) => {
    return <span className={styles['count']}>({count} customer review)</span>;
  };

  const renderNoRating = () => {
    return <span className={styles['no-rating']}>No rating</span>;
  };

  return (
    <div className={styles['rating']}>
      {ratingValue !== null ? (
        <>
          <div className={styles['stars']}>{renderStars(ratingValue)}</div>
          {renderRatingCount(ratingCount)}
        </>
      ) : (
        renderNoRating()
      )}
    </div>
  );
};

const renderParams = (productInfo: IProduct) => {
  const { id, brand, category, characteristics, stock, country, delivery } =
    productInfo;

  const params = [
    { name: 'SKU', value: id },
    { name: 'Brand', value: brand },
    { name: 'Category', value: category },
    { name: 'Color', value: characteristics.color },
    { name: 'Stock', value: stock ? 'In stock' : 'Out of stock' },
    { name: 'Size', value: characteristics.size },
    { name: 'Country', value: country },
    { name: 'Delivery', value: delivery },
  ];

  const getClassName = (name: string) => {
    if (name === 'Category') return styles['category'];

    if (name === 'Stock')
      return stock ? styles['in-stock'] : styles['out-of-stock'];
  };

  return (
    <div className={styles['params']}>
      {params.map((param, index) => (
        <div
          key={index}
          className={`${!param.value ? styles['empty'] : styles['param']}`}
        >
          <div className={styles['name']}>{param.name}</div>
          <div className={`${styles['value']} ${getClassName(param.name)}`}>
            {param.value}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderOutOfStock = () => (
  <div className={styles['out-of-stock']}>
    <div className={styles['text']}>Out of stock</div>
  </div>
);

const renderPrices = (
  price: number,
  currentQuantity: number,
  discount?: { final_price: number }
) => {
  const currentPrice = discount
    ? discount.final_price * currentQuantity
    : price * currentQuantity;
  const oldPrice = discount ? price * currentQuantity : null;

  return (
    <>
      <div className={styles['price']}>{currentPrice.toFixed(2)} USD</div>
      {oldPrice && (
        <div className={styles['old-price']}>{oldPrice.toFixed(2)} USD</div>
      )}
    </>
  );
};

const renderSelection = (
  currentQuantity: number,
  setCurrentQuantity: React.Dispatch<React.SetStateAction<number>>,
  stock: number
) => {
  const getClass = (index: number) =>
    index === currentQuantity
      ? `${styles['item']} ${styles['active']}`
      : styles['item'];

  const selection = Array.from({ length: stock }, (_, index) => (
    <div key={index} className={getClass(index + 1)}>
      <button onClick={() => setCurrentQuantity(index + 1)}>{index + 1}</button>
    </div>
  ));

  return <div className={styles['selection']}>{selection}</div>;
};

const renderQuantity = (
  currentQuantity: number,
  setCurrentQuantity: React.Dispatch<React.SetStateAction<number>>,
  listOpen: boolean,
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>,
  stock: number
) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value);

    if (newQuantity > stock) {
      newQuantity = stock;
    } else if (!newQuantity || isNaN(newQuantity)) {
      newQuantity = 1;
    }

    setCurrentQuantity(newQuantity);
  };

  return (
    <div className={styles['quantity']}>
      <input
        type="number"
        value={currentQuantity}
        onChange={(e) => onChangeHandler(e)}
        min="1"
      />
      <button
        className={`btn btn-small ${styles['button']}`}
        onClick={() => setListOpen(!listOpen)}
      >
        Pcs <i className={`icon-chevron-down ${listOpen ? 'open' : null}`}></i>
      </button>
      {listOpen && renderSelection(currentQuantity, setCurrentQuantity, stock)}
    </div>
  );
};

const renderAddToCart = () => (
  <button className="btn btn-medium btn-green">
    <i className="icon-actions-add-simple"></i> Add to cart
  </button>
);

const renderPurchaseBlock = (
  productInfo: IProduct,
  listOpen: boolean,
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>,
  currentQuantity: number,
  setCurrentQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!productInfo.stock) return renderOutOfStock();

  return (
    <>
      <div className={styles['prices']}>
        {renderPrices(productInfo.price, currentQuantity, productInfo.discount)}
      </div>
      <div className={styles['buttons']}>
        {renderQuantity(
          currentQuantity,
          setCurrentQuantity,
          listOpen,
          setListOpen,
          productInfo.stock
        )}
        {renderAddToCart()}
      </div>
    </>
  );
};

// COMPONENT
export const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [listOpen, setListOpen] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const fetchData = useGetProductsQuery({
    id: productId ? parseInt(productId) : 0,
  });
  const productInfo = fetchData?.data?.productsData[0];

  useEffect(() => {
    if (productInfo) {
      const breadcrumbs = [
        { name: 'Products', url: '/products' },
        {
          name: productInfo.category,
          url: `/products/${productInfo.category}`,
        },
        {
          name: productInfo.subcategory,
          url: `products/${productInfo.category}/${productInfo.subcategory}`,
        },
        {
          name: productInfo.name,
          url: `products/${productInfo.category}/${productInfo.subcategory}/${productInfo.name}`,
        },
      ];

      dispatch(setBreadcrumbs(breadcrumbs));
    }
  }, [productInfo, dispatch]);

  if (!productId || !productInfo) return null;

  return (
    <section className={`container ${styles['product']}`}>
      <section className={`section-medium ${styles['images']}`}>
        {renderImages(productInfo.image_urls)}

        {productInfo.discount &&
          renderDiscountTag(productInfo.discount.discount_percent)}
      </section>
      <section className={`section-medium ${styles['info']}`}>
        <h1>{productInfo.name}</h1>
        {renderRating(productInfo.rating.value, productInfo.rating.count)}
        <div className={styles['description']}>{productInfo.description}</div>
        {renderParams(productInfo)}
        <div className={styles['purchase']}>
          {renderPurchaseBlock(
            productInfo,
            listOpen,
            setListOpen,
            currentQuantity,
            setCurrentQuantity
          )}
        </div>
      </section>
    </section>
  );
};
