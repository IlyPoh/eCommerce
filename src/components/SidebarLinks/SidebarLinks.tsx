// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// types
import { ICategory, ISubcategory } from '../../types/store';
import { ILinkProps, ILink, ILinkWithYear } from '../../types';

// styles
import styles from './SidebarLinks.module.scss';

// TYPES
export interface ISidebarLinksProps {
  data: (ILink | ILinkWithYear | ICategory | ISubcategory)[];
  title: string;
  limit?: number;
  link?: ILinkProps;
}

// COMPONENT
export const SidebarLinks: React.FC<ISidebarLinksProps> = ({
  data,
  title,
  link,
  limit = 5,
}) => {
  if (!data.length) return null;

  const linkText = link?.text ?? 'Link text';
  const isCategoryData = 'id' in data[0];

  const renderedData = isCategoryData
    ? (data as (ICategory | ISubcategory)[]).slice(0, limit)
    : (data as (ILink | ILinkWithYear)[]);

  return (
    <aside className={styles['sidebar']}>
      <div className={styles['content']}>
        <h4>{title || 'No title'}</h4>
        <div className={styles['links']}>
          {renderedData?.map((item) => (
            <div
              className={styles['item']}
              key={
                isCategoryData
                  ? (item as ICategory | ISubcategory).id
                  : (item as ILink).text
              }
            >
              {
                <Link
                  to={
                    isCategoryData
                      ? `/${(item as ICategory | ISubcategory).id}`
                      : (item as ILink | ILinkWithYear).link
                  }
                  state={{
                    year: (item as ILinkWithYear).year?.year,
                    month: (item as ILinkWithYear).year?.month,
                  }}
                >
                  {isCategoryData
                    ? (item as ICategory | ISubcategory).name
                    : (item as ILink).text}
                </Link>
              }
            </div>
          ))}
        </div>
      </div>
      {link && (
        <Link className="btn btn-medium btn-grey" to={link?.link ?? '/'}>
          {linkText ?? 'Link text'}
          <i className={link?.icon} />
        </Link>
      )}
    </aside>
  );
};
