// IMPORTS
// libraries
import { Link, useLocation } from 'react-router-dom';

// utils
import { Counter } from '../Counter/Counter';

// styles
import styles from './Pagination.module.scss';
import { useAppSelector } from '../../utils/hooks';
import { EItemType } from '../../types';

// COMPONENT
export const Pagination: React.FC = () => {
  const { state } = useLocation();
  const { pageType, currentPage, pageURL, pageCount } = useAppSelector(
    (state) => state.pageState
  );
  const getClassNames = (index: number): string => {
    if (index === currentPage) return `${styles['link']} ${styles['active']}`;
    else return styles['link'];
  };

  const renderPagination = () => {
    const paginationLinks = [];

    paginationLinks.push(
      <Link
        to={pageURL}
        state={{ ...state, page: 1 }}
        key={1}
        className={getClassNames(1)}
      >
        1
      </Link>
    );

    if (currentPage > 3) {
      paginationLinks.push(<span key="ellipsis1">...</span>);
    }

    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, pageCount);

    for (let i = start; i <= end; i++) {
      paginationLinks.push(
        <Link
          to={pageURL}
          state={{ ...state, page: i }}
          className={getClassNames(i)}
          key={`${pageURL}-${i}`}
        >
          {i}
        </Link>
      );
    }

    if (currentPage < pageCount - 2) {
      paginationLinks.push(<span key="ellipsis2">...</span>);
    }

    if (
      currentPage !== pageCount - 1 &&
      currentPage !== pageCount &&
      pageCount > 1
    ) {
      paginationLinks.push(
        <Link
          to={pageURL}
          className={getClassNames(pageCount)}
          state={{ ...state, page: pageCount }}
          key={pageCount}
        >
          {pageCount}
        </Link>
      );
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
        <i className="icon-chevron-left"></i>
        Previous page
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
        Next page
        <i className="icon-chevron-right"></i>
      </Link>
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
    <>
      <section className="section-small">
        <div className={styles['block']}>
          <div className={styles['list']}>
            <span>Page:</span>
            {renderPagination()}
          </div>
          <div className={styles['buttons']}>
            {pageType === EItemType.NEWS ? renderBlogButtons() : null}
          </div>
          <Counter />
        </div>
      </section>
    </>
  );
};
