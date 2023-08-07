// IMPORTS
// store
import { setGridView } from '../../store/Slices/appSlice';
import { EType } from '../../types';
import { firstLettertoUppercase } from '../../utils/helpers';

// utils
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

// styles
import styles from './PageHeadline.module.scss';

// TYPE
interface IPageHeadlineProps {
  title: string;
  type: EType;
}

// COMPONENT
export const PageHeadline: React.FC<Partial<IPageHeadlineProps>> = ({
  title,
  type = EType.PRODUCTS,
}) => {
  const dispatch = useAppDispatch();
  const gridView = useAppSelector((state) => state.appState.gridView);
  const newsCount = useAppSelector((state) => state.newsState.news.length);
  const productCount = useAppSelector(
    (state) => state.productState.products.length
  );

  const handleGridView = () => {
    dispatch(setGridView(!gridView));
  };

  return (
    <>
      <div className={styles['title']}>
        <h2>{title ?? 'Page Headline'}</h2>
        <div className={styles['filters']}>
          <button
            onClick={handleGridView}
            className={`${styles['item']} ${gridView ? styles['active'] : ''}`}
          >
            <i className="icon-layout-square-grid" />
            <span>Grid view</span>
          </button>
          <button
            onClick={handleGridView}
            className={`${styles['item']} ${gridView ? '' : styles['active']}`}
          >
            <i className="icon-layout-sections" />
            <span>List view</span>
          </button>
          <div className={styles['item']}>
            <div className="tag">
              {type === EType.PRODUCTS && productCount}
              {type === EType.NEWS && newsCount}
            </div>
            <span>{firstLettertoUppercase(type)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
