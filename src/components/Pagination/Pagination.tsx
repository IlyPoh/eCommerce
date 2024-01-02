// IMPORTS
// libraries
import { Link, useLocation } from 'react-router-dom';

// components
import { Counter } from '@components/Counter/Counter';

// store
import { setItemsToShow } from '@store/Slices/pageSlice';

// types
import { EItemType } from '@customTypes/index';

// utils
import { useAppDispatch, useAppSelector } from '@utils/hooks';

// styles
import styles from './Pagination.module.scss';

// COMPONENT
export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { total } = useAppSelector((state) => state.appState);
  const {
    pageType,
    currentPage,
    pageURL,
    pageCount,
    itemsPerPage,
    itemsToShow,
  } = useAppSelector((state) => state.pageState);
  const getClassNames = (index: number): string => {
    if (index === currentPage) return `${styles['link']} ${styles['active']}`;
    else return styles['link'];
  };

  const createPaginationLink = (index: number) => (
    <Link
      to={pageURL}
      state={{ ...state, page: index }}
      className={getClassNames(index)}
      key={`${pageURL}-${index}`}
    >
      {index}
    </Link>
  );

  const renderPaginationLinks = () => {
    const paginationLinks = [];

    paginationLinks.push(createPaginationLink(1));

    if (currentPage > 3) {
      paginationLinks.push(<span key="ellipsis1">...</span>);
    }

    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, pageCount);

    for (let i = start; i <= end; i++) {
      paginationLinks.push(createPaginationLink(i));
    }

    if (currentPage < pageCount - 2) {
      paginationLinks.push(<span key="ellipsis2">...</span>);
    }

    if (
      currentPage !== pageCount - 1 &&
      currentPage !== pageCount &&
      pageCount > 1
    ) {
      paginationLinks.push(createPaginationLink(pageCount));
    }

    return paginationLinks;
  };

  const renderPreviousButton = () => {
    return currentPage > 1 ? (
      <Link
        to={pageURL}
        state={{ ...state, page: currentPage - 1 }}
        className="btn btn-medium btn-green"
      >
        <i className="icon-chevron-left"></i> Previous page
      </Link>
    ) : null;
  };

  const renderNextButton = () => {
    return currentPage < pageCount ? (
      <Link
        to={pageURL}
        state={{ ...state, page: currentPage + 1 }}
        className="btn btn-medium btn-green"
      >
        Next page <i className="icon-chevron-right"></i>
      </Link>
    ) : null;
  };

  const renderMoreButton = () => {
    if (!itemsToShow || !itemsPerPage || total.products < itemsToShow)
      return null;

    return currentPage < pageCount ? (
      <button
        onClick={() => dispatch(setItemsToShow(itemsToShow + itemsPerPage))}
        className="btn btn-medium btn-green"
      >
        Show more products<i className="icon-chevron-down"></i>
      </button>
    ) : null;
  };

  const renderBlogButtons = () => {
    return (
      <>
        {renderPreviousButton()}
        {renderNextButton()}
      </>
    );
  };

  return (
    <section className="section-medium">
      <div className={styles['block']}>
        <div className={styles['list']}>
          <span>Page:</span>
          {renderPaginationLinks()}
        </div>
        <div className={styles['buttons']}>
          {pageType === EItemType.NEWS && renderBlogButtons()}
          {pageType === EItemType.PRODUCTS && renderMoreButton()}
        </div>
        <Counter />
      </div>
    </section>
  );
};
