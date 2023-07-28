// IMPORTS
// components
import { ProductItem } from '../ProductItem/ProductItem';

// styles
import styles from './ProductList.module.scss';

//  TYPES
export interface IProductListProps {
  list: number[];
  limit?: number;
}

//  COMPONENT
export const ProductList: React.FC<IProductListProps> = ({
  list,
  limit = 3,
}) => {
  const renderedList = list.slice(0, limit);

  return (
    <>
      <div className={styles['list']}>
        {renderedList.map((item) => (
          <ProductItem key={item} id={item} />
        ))}
      </div>
    </>
  );
};
