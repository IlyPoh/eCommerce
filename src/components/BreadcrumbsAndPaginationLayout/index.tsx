// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { Pagination } from '../Pagination/Pagination';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

// COMPONENT
export const BreadcrumbsAndPaginationLayout: React.FC = () => {
  return (
    <>
      <div className="container">
        <Breadcrumbs />
      </div>
      <Outlet />
      <div className="container">
        <Pagination />
      </div>
    </>
  );
};
