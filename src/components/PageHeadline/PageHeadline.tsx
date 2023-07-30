// IMPORTS

// utils
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './PageHeadline.module.scss';

// TYPE
interface IPageHeadlineProps {
  title: string;
  type: 'product' | 'news';
}

// COMPONENT
export const PageHeadline: React.FC<Partial<IPageHeadlineProps>> = ({
  title,
  type = 'product',
}) => {
  const gridView = useAppSelector((state) => state.appState.gridView);
  const newsCount = useAppSelector((state) => state.newsState.news.length);
  const productCount = useAppSelector(
    (state) => state.productState.products.length
  );

  return (
    <>
      <div className={styles['title']}>
        <h2>{title ? title : 'Page Headline'}</h2>
        <div className={styles['filters']}>
          <button
            className={`${styles['item']} ${gridView ? styles['active'] : ''}`}
          >
            <i className="icon-layout-square-grid" />
            <span>Grid view</span>
          </button>
          <button
            className={`${styles['item']} ${gridView ? '' : styles['active']}`}
          >
            <i className="icon-layout-sections" />
            <span>List view</span>
          </button>
          <div className={styles['item']}>
            <div className="tag">
              {type === 'product' && productCount}
              {type === 'news' && newsCount}
            </div>
            <span>
              {type === 'product' && 'Products'}
              {type === 'news' && 'News'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
