// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// utils
import { useAppSelector } from '@/hooks';

// styles
import styles from './Breadcrumbs.module.scss';

// COMPONENT
export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useAppSelector((state) => state.pageState.breadcrumbs);

  if (!breadcrumbs.length) return null;

  return (
    <section className={`section-medium ${styles['breadcrumbs']}`}>
      <Link to={'/'} className={styles['item']}>
        Home
      </Link>
      {breadcrumbs.map(({ name, url }) => {
        return (
          <Link to={url} key={name} className={styles['item']}>
            {name}
          </Link>
        );
      })}
    </section>
  );
};
