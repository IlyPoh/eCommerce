// IMPORTS
// components
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { PageHeadline } from '../../components/PageHeadline/PageHeadline';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <PageHeadline title="Blog" type="news" />
      </div>
    </>
  );
};
