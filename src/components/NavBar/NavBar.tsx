// components
import { NavBarLink } from '../NavBarLink/NavBarLink';

// store
import { ICategory } from '../../types/store';

// utils
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './NavBar.module.scss';

export const NavBar: React.FC = () => {
  const categories = useAppSelector((state) => state.categoryState.categories);

  return (
    <>
      {categories && (
        <ul className={styles['nav']}>
          {categories.map((category: ICategory) => (
            <NavBarLink category={category} key={category.id} />
          ))}
        </ul>
      )}
    </>
  );
};
