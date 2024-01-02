// IMPORTS
// components
import { useState } from 'react';
import { CheckboxButton } from '@components/UI/CheckboxButton/CheckboxButton';

// store
import {
  removeTag,
  setCountry,
  setSort,
  setTags,
} from '@store/Slices/productsSlice';

// types
import { ESort, ICheckboxType } from '@customTypes/index';
import {
  FIRST_CHECKBOX_DATA as FIRST,
  SECOND_CHECKBOX_DATA as SECOND,
  THIRD_CHECKBOX_DATA as THIRD,
} from '@utils/constants';
import { firstLettertoUppercase } from '@utils/helpers';

// utils
import { useAppDispatch, useAppSelector } from '@utils/hooks';

// styles
import styles from './HeaderFilters.module.scss';

// COMPONENT
export const HeaderFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, filters } = useAppSelector((state) => state.productState);
  const [countrySelected, setCountrySelected] = useState(THIRD.value);
  const [countrySelectedNumber, setCountrySelectedNumber] = useState(
    THIRD.count
  );
  const [listOpen, setListOpen] = useState(false);

  const handleFilter = (filter: string) => {
    if (!filters.tags.includes(filter))
      dispatch(setTags([...filters.tags, filter]));
    else dispatch(removeTag(filter));
  };

  const handleCountry = (currentCountry: string) => {
    if (!filters.country) dispatch(setCountry(currentCountry));
    else dispatch(setCountry(''));
  };

  const handleSelector = (country: string, number: number) => {
    setCountrySelected(country);
    setCountrySelectedNumber(number);
    setListOpen(false);
  };

  return (
    <div className={styles['filters']}>
      <div className={styles['item']}>
        <CheckboxButton
          value={ESort.POPULAR}
          type={ICheckboxType.RADIO}
          onChange={() => dispatch(setSort(ESort.POPULAR))}
          checked={sort === ESort.POPULAR}
          label="Most popular"
        />
        <CheckboxButton
          value={ESort.CHEAPEST}
          type={ICheckboxType.RADIO}
          onChange={() => dispatch(setSort(ESort.CHEAPEST))}
          checked={sort === ESort.CHEAPEST}
          label="Cheapest"
        />
      </div>

      <div className={styles['item']}>
        <CheckboxButton
          value={FIRST.value}
          checked={filters?.tags.includes(FIRST.value)}
          type={ICheckboxType.CHECKBOX}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <span>{firstLettertoUppercase(FIRST.value)}</span>
          <div className="tag tag-transparent">{FIRST.count}</div>
        </CheckboxButton>
      </div>

      <div className={styles['item']}>
        <CheckboxButton
          value={SECOND.value}
          checked={filters?.tags.includes(SECOND.value)}
          type={ICheckboxType.CHECKBOX}
          onChange={(e) => handleFilter(e.target.value)}
          label={firstLettertoUppercase(SECOND.value)}
        >
          <span>{firstLettertoUppercase(SECOND.value)}</span>
          <div className="tag tag-transparent">{SECOND.count}</div>
        </CheckboxButton>
      </div>

      <div className={styles['item']}>
        <CheckboxButton
          value={countrySelected}
          checked={filters.country === countrySelected}
          type={ICheckboxType.CHECKBOX}
          onChange={(e) => handleCountry(e.target.value)}
          label={firstLettertoUppercase(THIRD.value)}
        >
          <span>{countrySelected}</span>
          <div className="tag tag-transparent">{countrySelectedNumber}</div>
        </CheckboxButton>

        <div className={styles['selector']}>
          <button
            className={styles['text']}
            onClick={() => setListOpen(!listOpen)}
          >
            Select:{' '}
            <i className={`icon-chevron-down ${listOpen ? 'open' : null}`}></i>
          </button>
          <ul
            className={`${styles['list']} ${listOpen ? styles['open'] : null}`}
          >
            {Object.entries(THIRD.selector).map(([country, value]) => (
              <li
                value={country}
                key={country}
                className={styles['list-item']}
                onClick={() => handleSelector(country, value)}
              >
                {country}
                <div className="tag tag-transparent">{value}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
