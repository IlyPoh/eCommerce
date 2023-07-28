// IMPORTS
// libraries
import { useState } from 'react';

// components
import { Button } from '../UI/Button/Button';

// types
import { ICategory } from '../../types/store';

// styles
import styles from './NavBarLink.module.scss';

//  TYPES
interface INavBarLinkProps {
  category: ICategory;
}

// COMPONENT
export const NavBarLink: React.FC<INavBarLinkProps> = ({ category }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <>
      <li
        key={category.id}
        className={`${styles['link']}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          className="btn btn-transparent btn-small-gap"
          text={category.name}
          icon="icon-chevron-down"
        />
        {category.subcategories && (
          <div
            className={open ? styles['dropdown'] : styles['dropdown-hidden']}
          >
            <ul>
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>{subcategory.name}</li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </>
  );
};
