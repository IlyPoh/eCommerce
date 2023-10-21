// IMPORTS
// libraries
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// components
import { PriceSlider } from './PriceSlider/PriceSlider';
import { CheckboxButton } from '../../../components/UI/CheckboxButton/CheckboxButton';

// store
import {
  resetFilters,
  setBrandsToFilter,
  setpricesToFilter,
  setRatingToFilter,
} from '../../../store/Slices/productsSlice';

// types
import { ICheckboxType } from '../../../types';

// utils
import {
  useAppDispatch,
  useAppSelector,
  useFetchBrands,
} from '../../../utils/hooks';

// styles
import styles from './SidebarFilter.module.scss';

// COMPONENT
export const SidebarFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useParams();
  const {
    products,
    categories,
    subcategories,
    brands,
    brandsToFilter,
    ratingToFilter,
  } = useAppSelector((state) => state.productState);
  const contentRefBrands = useRef<HTMLDivElement>(null);
  const [brandsExpanded, setBrandsExpanded] = useState(false);
  const [contentHeightBrands, setContentHeightBrands] = useState(0);
  const [brandsToRender, setBrandsToRender] =
    useState<string[]>(brandsToFilter);
  const [ratingToRender, setRatingToRender] =
    useState<number[]>(ratingToFilter);
  const productMaxPrice = Math.max(...products.map((product) => product.price));
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(productMaxPrice);

  useEffect(() => {
    if (contentRefBrands.current)
      setContentHeightBrands(contentRefBrands.current.scrollHeight);
  }, [brandsExpanded]);
  useFetchBrands();

  const handleSliderChange = (newValues: number[]) => {
    setMinPrice(newValues[0]);
    setMaxPrice(newValues[1]);
  };

  const handleBrands = (brand: string) => {
    if (!brandsToFilter.includes(brand))
      setBrandsToRender([...brandsToRender, brand]);
    else setBrandsToRender(brandsToFilter.filter((item) => item !== brand));
  };

  const handleRating = (rating: number) => {
    if (!ratingToRender.includes(rating))
      setRatingToRender([...ratingToRender, rating]);
    else setRatingToRender(ratingToRender.filter((item) => item !== rating));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleApplyFilters = () => {
    dispatch(setBrandsToFilter(brandsToRender));
    dispatch(setRatingToFilter(ratingToRender));
    dispatch(setpricesToFilter([minPrice, maxPrice]));
  };

  const renderCategories = () => {
    const items = category ? subcategoriesInCategory : categories;

    if (!items || (category && subcategory)) return null;

    return (
      <section>
        <h4>Categories</h4>
        <div className={styles['block']}>
          {items.map((item) => (
            <Link
              key={item.id}
              className={styles['item']}
              to={`/products/${
                category ? `${category}/${item.name}` : item.name
              }`}
            >
              {item.name}
              <div className="tag tag-green">{item.productsCount}</div>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  const renderBrands = () => {
    const defaultHeight = 150;

    return (
      <section className={styles['brands']}>
        <h4>Brands</h4>
        <div
          ref={contentRefBrands}
          className={styles['block']}
          style={{
            maxHeight: brandsExpanded
              ? contentHeightBrands + 'px'
              : defaultHeight,
          }}
        >
          {brands?.map((item) => (
            <CheckboxButton
              key={item}
              onChange={(e) => handleBrands(e.target.value)}
              value={item}
              checked={brandsToRender.includes(item)}
              type={ICheckboxType.CHECKBOX}
            >
              <span>{item}</span>
            </CheckboxButton>
          ))}
        </div>
        {!brandsExpanded ? (
          <div className={styles['button']}>
            <button
              className="btn btn-small btn-no-bg"
              onClick={() => setBrandsExpanded(!brandsExpanded)}
            >
              See more
            </button>
          </div>
        ) : null}
      </section>
    );
  };

  const renderRating = () => {
    const ratingValues = [5, 4, 3, 2, 1];
    const maxRating = 5;

    const renderStars = (value: number) => {
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

    const handleCheckboxChange = (value: number) => {
      handleRating(value);
    };

    return (
      <section className={styles['rating']}>
        <div className={styles['block']}>
          <h4>Rating</h4>
          {ratingValues.map((value) => (
            <div className={styles['item']} key={value}>
              <CheckboxButton
                onChange={() => handleCheckboxChange(value)}
                value={`${value}`}
                checked={ratingToRender.includes(value)}
                type={ICheckboxType.CHECKBOX}
              >
                {renderStars(value)}
              </CheckboxButton>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const subcategoriesInCategory = categories?.filter(
    (item) => item.name === category
  )[0]?.subcategories;

  if (!categories || !subcategories) return null;
  return (
    <div className={styles['aside-content']}>
      {categories && subcategories && renderCategories()}
      {brands && renderBrands()}
      {renderRating()}
      <PriceSlider onPriceChange={handleSliderChange} />
      <section className={styles['buttons']}>
        <button
          className="btn btn-small btn-green"
          onClick={() => handleApplyFilters()}
        >
          Apply
        </button>
        <button
          className={`btn btn-small btn-tranparent ${styles['reset']}`}
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </section>
    </div>
  );
};
