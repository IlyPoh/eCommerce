// IMPORTS
// components
import {
  ProductList,
  IProductListProps,
} from '../../../components/ProductList/ProductList';
import {
  ISidebarInBlockProps,
  SidebarInBlock,
} from '../../../components/SidebarInBlock/SidebarInBlock';

// styles
import styles from './BlockWithProducts.module.scss';

// TYPES
interface BlockWithProductsProps {
  sidebarData: ISidebarInBlockProps;
  productList: IProductListProps;
}

// COMPONENT
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
          link={sidebarData.link}
          limit={sidebarData.limit}
        />
        <ProductList list={productList.list} limit={productList.limit} />
      </div>
    </>
  );
};
