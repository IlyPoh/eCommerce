// IMPOTS
// types
import { EItemType } from '../../types';

// utils
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './Counter.module.scss';

// TYPE
interface ICounterProps {
  type: EItemType;
}

// COMPONENT
export const Counter: React.FC<ICounterProps> = ({ type }) => {
  const newsCount = useAppSelector((state) => state.newsState.news.length);
  const productCount = useAppSelector(
    (state) => state.productState.products.length
  );

  let count = 0;
  let text = 'Items';

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
        <div className="tag">{count}</div>
        <div className={styles['text']}>{text}</div>
      </div>
    </>
  );
};
