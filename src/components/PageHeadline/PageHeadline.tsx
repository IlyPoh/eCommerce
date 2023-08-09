// IMPORTS
// store
import { setGridView } from '../../store/Slices/appSlice';

// types
import { EType } from '../../types';

// utils
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { Counter } from '../Counter/Counter';

// styles
import styles from './PageHeadline.module.scss';

// TYPE
interface IPageHeadlineProps {
  title?: string;
  type?: EType;
}

// COMPONENT
export const PageHeadline: React.FC<Partial<IPageHeadlineProps>> = ({
  title,
  type = EType.PRODUCTS,
}) => {
  const dispatch = useAppDispatch();
  const gridView = useAppSelector((state) => state.appState.gridView);

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
          <Counter type={type} />
        </div>
      </div>
    </>
  );
};
