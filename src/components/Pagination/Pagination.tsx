// IMPORTS
// types
import { EItemType } from '../../types';
import { Link, useLocation } from 'react-router-dom';

// utils
import { Counter } from '../Counter/Counter';

// styles
import styles from './Pagination.module.scss';

// TYPE
interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  link: string;
  type: EItemType;
}

// COMPONENT
export const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  type,
  link,
  currentPage = 1,
}) => {
  const { state } = useLocation();
  const getClassNames = (index: number): string => {
    if (index === currentPage) return `${styles['link']} ${styles['active']}`;
    else return styles['link'];
  };

  const renderPagination = () => {
    const paginationLinks = [];

    paginationLinks.push(
      <Link
        to={link}
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
    const end = Math.min(currentPage + 1, totalPages);

    for (let i = start; i <= end; i++) {
      paginationLinks.push(
        <Link
          to={link}
          state={{ ...state, page: i }}
          className={getClassNames(i)}
          key={`${link}-${i}`}
        >
          {i}
        </Link>
      );
    }

    if (currentPage < totalPages - 2) {
      paginationLinks.push(<span key="ellipsis2">...</span>);
    }

    if (
      currentPage !== totalPages - 1 &&
      currentPage !== totalPages &&
      totalPages > 1
    ) {
      paginationLinks.push(
        <Link
          to={link}
          className={getClassNames(totalPages)}
          state={{ ...state, page: totalPages }}
          key={totalPages}
        >
          {totalPages}
        </Link>
      );
    }

    return paginationLinks;
  };

  return (
    <>
      <div className={styles['block']}>
        <div className={styles['list']}>
          <span>Page:</span>
          {renderPagination()}
        </div>
        <div className={styles['buttons']}>
          {currentPage > 1 ? (
            <Link
              to={link}
              state={{ ...state, page: currentPage - 1 }}
              className="btn btn-medium btn-green"
            >
              <i className="icon-chevron-left"></i>
              Previous page
            </Link>
          ) : null}

          {currentPage < totalPages ? (
            <Link
              to={link}
              state={{ ...state, page: currentPage + 1 }}
              className="btn btn-medium btn-green"
            >
              Next page
              <i className="icon-chevron-right"></i>
            </Link>
          ) : null}
        </div>
        <Counter type={type} />
      </div>
    </>
  );
};
