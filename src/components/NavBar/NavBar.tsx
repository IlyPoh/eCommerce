// IMPORTS
// components
import { NavBarLink } from '@components/NavBarLink/NavBarLink';

// store
import { ICategory } from '@customTypes/store';

// utils
import { useAppSelector } from '@/hooks';

// styles
import styles from './NavBar.module.scss';

// COMPONENT
export const NavBar: React.FC = () => {
  const categories = useAppSelector((state) => state.productState.categories);

  return (
    <>
      {categories && (
        <section className={`section-medium ${styles['nav']}`}>
          <nav className="container">
            <ul className={styles['list']}>
              {categories.map((category: ICategory) => (
                <NavBarLink category={category} key={category.id} />
              ))}
            </ul>
          </nav>
        </section>
      )}
    </>
  );
};
