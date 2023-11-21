// IMPORTS
// libraries
import { Link, useLocation, useParams } from 'react-router-dom';

// components
import { HeaderFilters } from './HeaderFilters/HeaderFilters';

// types
import { EItemType, EView, IPaginationIndexes } from '../../types';

// utils
import {
  firstLettertoUppercase,
  getPaginationIndexes,
  getProductsLink,
  handleRemoveFilter,
} from '../../utils/helpers';
import {
  useAppSelector,
  useFetchCategories,
  useFetchProducts,
  usePageState,
} from '../../utils/hooks';

// styles
import styles from './Products.module.scss';
import { IProduct } from '../../types/store';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { SidebarFilter } from './SidebarFilter/SidebarFilter';

// COMPONENT
export const Products: React.FC = () => {
  const { category, subcategory } = useParams();
  const { state } = useLocation();
  const { products, categories, subcategories, sort, filters, country } =
    useAppSelector((state) => state.productState);
  const { itemsPerPage, itemsToShow } = useAppSelector(
    (state) => state.pageState
  );
  const gridView = useAppSelector((state) => state.appState.gridView);

  const pageTitle = subcategory ?? category ?? 'Products';

  const productsLink = getProductsLink(category, subcategory);
  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    state?.page ?? 1,
    itemsToShow
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useFetchProducts();
  useFetchCategories();

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: productsLink,
    pageType: EItemType.PRODUCTS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    itemsPerPage: 9,
    itemsToShow: itemsPerPage,
    itemCount: products.length,
  });

  const filteredData = products.filter((product: IProduct) => {
    if (!state?.tags?.length) return true;
    else return state.tags.every((tag: string) => product.tags?.includes(tag));
  });

  const renderFilters = () => {
    return (
      <>
        <div className={styles['text']}>Applied Filters:</div>
        {state.tags.map((tag: string) => (
          <Link
            className="tag tag-green"
            key={tag}
            to={productsLink}
            state={{ ...state, tags: handleRemoveFilter(state.tags, tag) }}
          >
            {firstLettertoUppercase(tag)}
            <i className="icon-actions-close-simple"></i>
          </Link>
        ))}
      </>
    );
  };

  const renderProducts = () => {
    return (
      <div
        className={`${styles['content']} ${
          gridView ? styles[EView.GRID] : styles[EView.LIST]
        } `}
      >
        {filteredData
          .slice(productIndexesToRender.start, productIndexesToRender.end)
          .map((product: IProduct) => (
            <ProductItem
              key={product.id}
              data={product}
              view={gridView ? EView.GRID : EView.LIST}
            />
          ))}
      </div>
    );
  };

  const renderNoProducts = () => {
    return (
      <div className={styles['content']}>
        <div className={styles['no-products']}>
          <h2>No products found</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <section className="section-medium">
        <HeaderFilters />
        <div className={styles['filter']}>
          {state?.tags?.length && renderFilters()}
        </div>
      </section>
      <section className={`section ${styles['body']}`}>
        <aside>
          <SidebarFilter />
        </aside>
        {filteredData.length ? renderProducts() : renderNoProducts()}
      </section>
    </div>
  );
};
