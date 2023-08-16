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
      <section className={`section-medium ${styles['breadcrumbs']}`}>
        {breadcrumbs.map(({ match, breadcrumb }) => {
          if (match.pathname !== '/blog/article') {
            return (
              <Link
                to={match.pathname}
                key={match.pathname}
                className={styles['item']}
              >
                {breadcrumb}
              </Link>
            );
          }
        })}
      </section>
    </>
  );
};
