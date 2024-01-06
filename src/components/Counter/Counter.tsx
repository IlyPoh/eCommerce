// IMPOTS
// types
import { EItemType } from '@customTypes/index';

// utils
import { useAppSelector } from '@/hooks';

// styles
import styles from './Counter.module.scss';

// COMPONENT
export const Counter: React.FC = () => {
  const { total } = useAppSelector((state) => state.appState);
  const type = useAppSelector((state) => state.pageState.pageType);

  let count = 0;
  let text = null;

  if (type === EItemType.PRODUCTS) {
    count = total.products;
    text = 'Products';
  } else if (type === EItemType.NEWS) {
    count = total.news;
    text = 'Articles';
  }

  return (
    <div className={styles['counter']}>
      <div className="tag tag-green">{count}</div>
      {text && <div className={styles['text']}>{text}</div>}
    </div>
  );
};
