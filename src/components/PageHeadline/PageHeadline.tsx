// IMPORTS
// components
import { Counter } from '../Counter/Counter';

// store
import { setGridView } from '../../store/Slices/appSlice';

// types
import { EItemType } from '../../types';

// utils
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

// styles
import styles from './PageHeadline.module.scss';

// TYPE
interface IPageHeadlineProps {
  title?: string;
  type?: EItemType;
}

// COMPONENT
export const PageHeadline: React.FC<Partial<IPageHeadlineProps>> = () => {
  const dispatch = useAppDispatch();
  const pageTitle = useAppSelector((state) => state.pageState.pageTitle);
  const gridView = useAppSelector((state) => state.appState.gridView);

  const handleGridView = () => {
    dispatch(setGridView(!gridView));
  };

  const renderViewButton = (
    iconClass: string,
    text: string,
    isActive: boolean
  ) => (
    <button
      onClick={handleGridView}
      className={`${styles['item']} ${isActive && styles['active']}`}
    >
      <i className={iconClass} />
      <span>{text}</span>
    </button>
  );

  return (
    <section className={`section-small ${styles['title']}`}>
      <h2>{pageTitle ?? 'Page Headline'}</h2>
      <div className={styles['filters']}>
        {renderViewButton('icon-layout-square-grid', 'Grid view', gridView)}
        {renderViewButton('icon-layout-sections', 'List view', !gridView)}
        <Counter />
        <Counter />
      </div>
    </section>
  );
};
