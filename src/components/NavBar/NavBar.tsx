// libraries
import { useSelector } from 'react-redux';

// components
import { NavBarLink } from '../NavBarLink/NavBarLink';

// store
import { RootState } from '../../store';
import { ICategory } from '../../types/store';

// styles
import styles from './NavBar.module.scss';

export const NavBar: React.FC = () => {
  const categories = useSelector(
    (state: RootState) => state.categoryState.categories
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
