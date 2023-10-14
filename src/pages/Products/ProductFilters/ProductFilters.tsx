// IMPORTS
// components
import { CheckboxButton } from '../../../components/UI/CheckboxButton/CheckboxButton';

// store
import { setFilters, setSort } from '../../../store/Slices/productsSlice';

// types
import { EFilter, ESort, ICheckboxData, ICheckboxType } from '../../../types';
import { firstLettertoUppercase } from '../../../utils/helpers';

// utils
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

// styles
import styles from './ProductFilters.module.scss';

// DATA
const FIRST_CHECKBOX_DATA: ICheckboxData = {
  value: EFilter.CLOTHING,
  count: 13,
};

const SECOND_CHECKBOX_DATA: ICheckboxData = {
  value: EFilter.KIDS,
  count: 4,
};

// COMPONENT
export const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, filters } = useAppSelector((state) => state.productState);
  console.log('🚀 ~ file: ProductFilters.tsx:34 ~ filters:', filters);

  const handleFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      dispatch(setFilters([...filters, filter]));
    } else {
      dispatch(setFilters(filters.filter((f) => f !== filter)));
    }
  };

  return (
    <>
      <section className={styles['filters']}>
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
            value={FIRST_CHECKBOX_DATA.value}
            checked={filters.includes(FIRST_CHECKBOX_DATA.value)}
            type={ICheckboxType.CHECKBOX}
            onChange={() => handleFilter(FIRST_CHECKBOX_DATA.value)}
          >
            <span>{firstLettertoUppercase(FIRST_CHECKBOX_DATA.value)}</span>
            <div className="tag tag-transparent">
              {FIRST_CHECKBOX_DATA.count}
            </div>
          </CheckboxButton>
        </div>

        <div className={styles['item']}>
          <CheckboxButton
            value={SECOND_CHECKBOX_DATA.value}
            checked={filters.includes(SECOND_CHECKBOX_DATA.value)}
            type={ICheckboxType.CHECKBOX}
            onChange={() => handleFilter(SECOND_CHECKBOX_DATA.value)}
            label={firstLettertoUppercase(SECOND_CHECKBOX_DATA.value)}
          >
            <span>{firstLettertoUppercase(SECOND_CHECKBOX_DATA.value)}</span>
            <div className="tag tag-transparent">
              {SECOND_CHECKBOX_DATA.count}
            </div>
          </CheckboxButton>
        </div>
      </section>
    </>
  );
};
