// IMPORTS
// libraries
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

// styles
import styles from './Breadcrumbs.module.scss';

// COMPONENT
export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useReactRouterBreadcrumbs();

  return (
    <>
      <div className={styles['breadcrumbs']}>
        {breadcrumbs.map((breadcrumb) => (
          <Link
            to={breadcrumb.key}
            key={breadcrumb.key}
            className={styles['item']}
          >
            {breadcrumb.breadcrumb}
          </Link>
        ))}
      </div>
    </>
  );
};
