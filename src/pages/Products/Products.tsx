// IMPORTS
// libraries
import { useLocation } from 'react-router-dom';

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
  const { state } = useLocation();

  const { products, categories } = useAppSelector(
    (state) => state.productState
  );
  const gridView = useAppSelector((state) => state.appState.gridView);

  const pageTitle = state?.category ?? 'Products';

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
      <div></div>
    </>
  );
};
