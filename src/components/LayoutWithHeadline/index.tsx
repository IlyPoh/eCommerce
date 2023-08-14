// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { PageHeadline } from '../PageHeadline/PageHeadline';

// COMPONENT
export const LayoutWithHeadline: React.FC = () => {
  return (
    <>
      <div className="container">
        <PageHeadline />
      </div>

      <Outlet />
    </>
  );
};
