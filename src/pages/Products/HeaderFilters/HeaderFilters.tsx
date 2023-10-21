// IMPORTS
// components
import { useState } from 'react';
import { CheckboxButton } from '../../../components/UI/CheckboxButton/CheckboxButton';

// store
import {
  setCountry,
  setFilters,
  setSort,
} from '../../../store/Slices/productsSlice';

// types
import { ESort, ICheckboxType } from '../../../types';
import {
  FIRST_CHECKBOX_DATA as FIRST,
  SECOND_CHECKBOX_DATA as SECOND,
  THIRD_CHECKBOX_DATA as THIRD,
} from '../../../utils/constants';
import { firstLettertoUppercase } from '../../../utils/helpers';

// utils
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

// styles
import styles from './HeaderFilters.module.scss';

// COMPONENT
export const HeaderFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, filters, country } = useAppSelector(
    (state) => state.productState
  );
  const [countrySelected, setCountrySelected] = useState(THIRD.value);
  const [countrySelecredNumber, setCountrySelectedNumber] = useState(
    THIRD.count
  );
  const [listOpen, setListOpen] = useState(false);

  const handleFilter = (filter: string) => {
    if (!filters.includes(filter)) dispatch(setFilters([...filters, filter]));
    else dispatch(setFilters(filters.filter((f) => f !== filter)));
  };

  const handleCountry = (currentCountry: string) => {
    if (!country) dispatch(setCountry(currentCountry));
    else dispatch(setCountry(''));
  };

  const handleSelector = (country: string, number: number) => {
    setCountrySelected(country);
    setCountrySelectedNumber(number);
    setListOpen(false);
  };

  return (
    <>
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
            checked={filters.includes(FIRST.value)}
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
            checked={filters.includes(SECOND.value)}
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
            checked={country === countrySelected}
            type={ICheckboxType.CHECKBOX}
            onChange={(e) => handleCountry(e.target.value)}
            label={firstLettertoUppercase(THIRD.value)}
          >
            <span>{countrySelected}</span>
            <div className="tag tag-transparent">{countrySelecredNumber}</div>
          </CheckboxButton>

          <div className={styles['selector']}>
            <div
              className={styles['text']}
              onClick={() => setListOpen(!listOpen)}
            >
              Select:
              <i className="icon-chevron-down"></i>
            </div>
            <ul
              className={`${styles['list']} ${
                listOpen ? styles['open'] : null
              }`}
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
    </>
  );
};
