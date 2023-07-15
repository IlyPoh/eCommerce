// components
import {
  ISidebarInBlockProps,
  SidebarInBlock,
} from '../SidebarInBlock/SidebarInBlock';
import {
  ProductCardList,
  ProductCardListProps,
} from '../../../components/ProductCardList/ProductCardList';

// styles
import styles from './BlockWithProducts.module.scss';

interface BlockWithProductsProps {
  sidebarData: ISidebarInBlockProps;
  productList: ProductCardListProps;
}

export const BlockWithProducts: React.FC<BlockWithProductsProps> = ({
  sidebarData,
  productList,
}) => {
  return (
    <>
      <div className={styles['block-with-products']}>
        <SidebarInBlock
          data={sidebarData.data}
          title={sidebarData.title}
          button={sidebarData.button}
          limit={sidebarData.limit}
        />
        <ProductCardList list={productList.list} limit={productList.limit} />
      </div>
    </>
  );
};
