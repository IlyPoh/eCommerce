// IMPORTS
// libraries
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// components
import { HeaderFilters } from './HeaderFilters/HeaderFilters';
import { SidebarFilter } from './SidebarFilter/SidebarFilter';
import { ProductItem } from '@/components/ProductItem/ProductItem';

// types
import { IProduct } from '@/types/store';
import { EItemType, EView } from '@/types';

// store
import { setBreadcrumbs } from '@/store/Slices/pageSlice';

// utils
import { ITEMS_PER_PAGE as IPP } from '@/utils/constants';
import { handleRemoveFilter } from '@/utils/helpers/array';
import {
  firstLettertoUppercase,
  getProductsLink,
} from '@/utils/helpers/string';
import {
  useAppDispatch,
  useAppSelector,
  useFetchCategories,
  useFetchProducts,
  useFetchTotal,
  usePageState,
} from '@/hooks';

// styles
import styles from './Products.module.scss';

// COMPONENT
export const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, subcategory } = useParams();
  const { state } = useLocation();
  const { products, sort, filters } = useAppSelector(
    (state) => state.productState
  );
  const { currentPage, itemsToShow } = useAppSelector(
    (state) => state.pageState
  );
  const gridView = useAppSelector((state) => state.appState.gridView);

  const { productsData, totalPages } = products;
  const pageTitle = subcategory ?? category ?? 'Products';

  const productsLink = getProductsLink(category, subcategory);

  useFetchCategories();
  useFetchTotal();

  useEffect(() => {
    const breadcrumbs = [{ name: 'Products', url: '/products' }];

    if (category)
      breadcrumbs.push({
        name: category,
        url: `/products/${category}`,
      });

    if (subcategory)
      breadcrumbs.push({
        name: subcategory,
        url: `/products/${category}/${subcategory}`,
      });

    dispatch(setBreadcrumbs(breadcrumbs));
  }, [dispatch, category, subcategory]);

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: productsLink,
    pageType: EItemType.PRODUCTS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    itemsPerPage: IPP.products,
    itemsToShow: itemsToShow ?? IPP.products,
  });

  useFetchProducts({
    category: category,
    subcategory: subcategory,
    brands: filters?.brands,
    tags: filters?.tags,
    ratings: filters?.ratings,
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
    country: filters?.country,
    sort: sort,
    limit: itemsToShow ?? IPP.products,
    page: currentPage,
  });

  const filteredData = productsData.filter((product: IProduct) => {
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
        {filteredData.map((product: IProduct) => (
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
