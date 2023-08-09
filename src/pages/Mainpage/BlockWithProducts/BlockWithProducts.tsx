// IMPORTS
// components
import {
  ProductList,
  IProductListProps,
} from '../../../components/ProductList/ProductList';
import {
  ISidebarLinksProps,
  SidebarLinks,
} from '../../../components/SidebarLinks/SidebarLinks';

// styles
import styles from './BlockWithProducts.module.scss';

// TYPES
interface BlockWithProductsProps {
  sidebarData: ISidebarLinksProps;
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
        <SidebarLinks
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
