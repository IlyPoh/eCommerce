// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { Pagination } from '@/components/Pagination/Pagination';
import { PageHeadline } from '@/components/PageHeadline/PageHeadline';

// COMPONENT
export const HeadlineAndPaginationLayout: React.FC = () => {
  return (
    <>
      <div className='container'>
        <PageHeadline />
      </div>

      <Outlet />

      <div className='container'>
        <Pagination />
      </div>
    </>
  );
};
