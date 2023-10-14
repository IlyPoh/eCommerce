// IMPORTS
// libraries
import { useLocation, useParams } from 'react-router-dom';

// components
import { ProductFilters } from './ProductFilters/ProductFilters';

// types
import { EItemType, IPaginationIndexes } from '../../types';

// utils
import { getPaginationIndexes } from '../../utils/helpers';
import {
  useAppSelector,
  useFetchCategories,
  useFetchProducts,
  usePageState,
} from '../../utils/hooks';

// styles
import styles from './Products.module.scss';

// COMPONENT
export const Products: React.FC = () => {
  const { category } = useParams();
  const { state } = useLocation();

  const { products, categories, sort } = useAppSelector(
    (state) => state.productState
  );
  console.log('🚀 ~ file: index.tsx:31 ~ products:', products);
  // console.log('🚀 ~ file: Products.tsx:32 ~ categories:', categories);

  const pageState = useAppSelector((state) => state.pageState);
  const gridView = useAppSelector((state) => state.appState.gridView);

  const pageTitle = category ?? 'Products';

  const productsPerPage = 9;
  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    state?.page ?? 1,
    productsPerPage
  );
  const productHighlightLastIndex = productIndexesToRender.start + 2;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useFetchProducts();
  useFetchCategories();

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: '/products',
    pageType: EItemType.PRODUCTS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    itemsPerPage: 9,
    itemCount: products.length,
  });

  return (
    <>
      <div className="container">
        <ProductFilters />
      </div>
    </>
  );
};
