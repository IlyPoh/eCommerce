// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { Pagination } from '../Pagination/Pagination';
import { PageHeadline } from '../PageHeadline/PageHeadline';

// COMPONENT
export const HeadlineAndPaginationLayout: React.FC = () => {
  return (
    <>
      <div className="container">
        <PageHeadline />
      </div>

      <Outlet />

      <div className="container">
        <Pagination />
      </div>
    </>
  );
};
