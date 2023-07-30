// IMPORTS
import { PageHeadline } from '../../components/PageHeadline/PageHeadline';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  return (
    <>
      <div className="container">
        <PageHeadline title="Blog" type="news" />
      </div>
    </>
  );
};
