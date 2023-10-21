// IMPORTS
// libraries
import { useState } from 'react';

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
        <button className="btn btn-transparent btn-small-gap">
          {category.name} <i className="icon-chevron-down" />
        </button>
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
