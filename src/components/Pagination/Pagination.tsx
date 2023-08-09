// IMPORTS
// types
import { EType } from '../../types';
import { Link } from 'react-router-dom';

// utils
import { Counter } from '../Counter/Counter';

// styles
import styles from './Pagination.module.scss';

// TYPE
interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  type?: EType;
}

// COMPONENT
export const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  type,
  currentPage = 1,
}) => {
  let link = '';
  if (type === EType.PRODUCTS) {
    link = '/products';
  } else if (type === EType.NEWS) {
    link = '/blog';
  }

  const getClassNames = (index: number): string => {
    if (index === currentPage) return `${styles['link']} ${styles['active']}`;
    else return styles['link'];
  };

  const renderPagination = () => {
    const paginationLinks = [];

    paginationLinks.push(
      <Link key={1} to="/blog" className={getClassNames(1)}>
        1
      </Link>
    );

    if (currentPage > 4) {
      paginationLinks.push(<span key="ellipsis1">...</span>);
    }

    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages);

    for (let i = start; i <= end; i++) {
      paginationLinks.push(
        <Link
          to={`${link}/${i}`}
          className={getClassNames(i)}
          key={`${link}-${i}`}
        >
          {i}
        </Link>
      );
    }

    if (currentPage < totalPages - 3) {
      paginationLinks.push(<span key="ellipsis2">...</span>);
    }

    if (
      currentPage !== totalPages - 1 &&
      currentPage !== totalPages &&
      totalPages > 1
    ) {
      paginationLinks.push(
        <Link key={totalPages} to={`${link}/${totalPages}`}>
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
              className="btn btn-medium btn-green"
              to={`${link}/${currentPage - 1}`}
            >
              <i className="icon-chevron-left"></i>
              Previous page
            </Link>
          ) : null}

          {currentPage < totalPages ? (
            <Link
              className="btn btn-medium btn-green"
              to={`${link}/${currentPage + 1}`}
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
