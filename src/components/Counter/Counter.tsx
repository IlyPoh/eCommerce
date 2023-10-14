// IMPOTS
// types
import { EItemType } from '../../types';

// utils
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './Counter.module.scss';

// COMPONENT
export const Counter: React.FC = () => {
  const newsCount = useAppSelector((state) => state.newsState.news.length);
  const type = useAppSelector((state) => state.pageState.pageType);
  const productCount = useAppSelector(
    (state) => state.productState.products.length
  );

  let count = 0;
  let text = null;

  if (type === EItemType.PRODUCTS) {
    count = productCount;
    text = 'Products';
  } else if (type === EItemType.NEWS) {
    count = newsCount;
    text = 'Articles';
  }

  return (
    <>
      <div className={styles['counter']}>
        <div className="tag tag-green">{count}</div>
        {text && <div className={styles['text']}>{text}</div>}
      </div>
    </>
  );
};
