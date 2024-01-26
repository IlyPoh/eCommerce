// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

// COMPONENT
export const BreadcrumbsLayout: React.FC = () => {
  return (
    <>
      <div className='container'>
        <Breadcrumbs />
      </div>
      <Outlet />
    </>
  );
};
