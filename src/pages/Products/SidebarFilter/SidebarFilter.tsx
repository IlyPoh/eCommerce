// IMPORTS
// libraries
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// components
import { PriceSlider } from './PriceSlider/PriceSlider';
import { CheckboxButton } from '@/components/UI/CheckboxButton/CheckboxButton';

// store
import {
  resetFilters,
  setFilters,
  setPrices,
} from '@/store/Slices/productsSlice';

// types
import { ICheckboxType } from '@/types';

// utils
import { useAppDispatch, useAppSelector, useFetchBrands } from '@/hooks';

// styles
import styles from './SidebarFilter.module.scss';

// COMPONENT
export const SidebarFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useParams();
  const { categories, subcategories, brands } = useAppSelector(
    state => state.productState
  );
  const { total } = useAppSelector(state => state.appState);
  const contentRefBrands = useRef<HTMLDivElement>(null);
  const [brandsExpanded, setBrandsExpanded] = useState(false);
  const [contentHeightBrands, setContentHeightBrands] = useState(0);
  const filters = useAppSelector(state => state.productState.filters);
  const [brandsToRender, setBrandsToRender] = useState<string[]>(
    filters.brands
  );
  const [ratingsToRender, setRatingsToRender] = useState<number[]>(
    filters.ratings
  );
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(total.maxPriceProduct);

  useEffect(() => {
    if (contentRefBrands.current)
      setContentHeightBrands(contentRefBrands.current.scrollHeight);

    setMaxPrice(total.maxPriceProduct);
  }, [brandsExpanded, total.maxPriceProduct]);
  useFetchBrands();

  const handleSliderChange = (newValues: number[]) => {
    setMinPrice(newValues[0]);
    setMaxPrice(newValues[1]);
  };

  const handleBrands = (brand: string) => {
    if (!brandsToRender.includes(brand))
      setBrandsToRender([...brandsToRender, brand]);
    else setBrandsToRender(brandsToRender.filter(item => item !== brand));
  };

  const handleRating = (rating: number) => {
    if (!ratingsToRender.includes(rating))
      setRatingsToRender([...ratingsToRender, rating]);
    else setRatingsToRender(ratingsToRender.filter(item => item !== rating));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(setPrices({ min: 0, max: total.maxPriceProduct }));
    setMaxPrice(total.maxPriceProduct);
  };

  const handleApplyFilters = () => {
    dispatch(
      setFilters({
        ...filters,
        ratings: ratingsToRender,
        brands: brandsToRender,
        minPrice: minPrice,
        maxPrice: !maxPrice ? total.maxPriceProduct : maxPrice,
      })
    );
  };

  const renderCategories = () => {
    const items = category ? subcategoriesInCategory : categories;

    if (!items || (category && subcategory)) return null;

    return (
      <section>
        <h4>Categories</h4>
        <div className={styles['block']}>
          {items.map(item => (
            <Link
              key={item.id}
              className={styles['item']}
              to={`/products/${
                category ? `${category}/${item.name}` : item.name
              }`}
            >
              <span>{item.name}</span>
              <div className='tag tag-green'>{item.productsCount}</div>
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
          {brands?.map(item => (
            <CheckboxButton
              key={item}
              onChange={e => handleBrands(e.target.value)}
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
              className='btn btn-small btn-no-bg'
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
          {ratingValues.map(value => (
            <div className={styles['item']} key={value}>
              <CheckboxButton
                onChange={() => handleCheckboxChange(value)}
                value={`${value}`}
                checked={ratingsToRender.includes(value)}
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
    item => item.name === category
  )[0]?.subcategories;

  if (!categories || !subcategories) return null;
  return (
    <div className={styles['aside-content']}>
      {categories && subcategories && renderCategories()}
      {brands && renderBrands()}
      {renderRating()}
      <PriceSlider
        onPriceChange={handleSliderChange}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        total={{ min: 0, max: total.maxPriceProduct }}
      />
      <section className={styles['buttons']}>
        <button
          className='btn btn-small btn-green'
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
