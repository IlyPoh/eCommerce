// libraries
import { useSelector } from 'react-redux';

// components
import { NavBarLink } from '../NavBarLink/NavBarLink';

// store
import { ICategory, IStore } from '../../types/store';

// styles
import styles from './NavBar.module.scss';

export const NavBar: React.FC = () => {
  const categories = useSelector(
    (state: IStore) => state.categories.categories
  );

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
