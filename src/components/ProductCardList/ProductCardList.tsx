// components
import { ProductCard } from '../ProductCard/ProductCard';

// styles
import styles from './ProductCardList.module.scss';

export interface ProductCardListProps {
  list: number[];
  limit?: number;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({
  list,
  limit = 3,
}) => {
  const renderedList = list.slice(0, limit);

  return (
    <>
      <div className={styles['list']}>
        {renderedList.map((item) => (
          <ProductCard key={item} id={item} />
        ))}
      </div>
    </>
  );
};
