// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// types
import { ICategory } from '../../../types/store';
import { ILinkProps, ILink } from '../../../types';

// styles
import styles from './SidebarInBlock.module.scss';

// TYPES
export interface ISidebarInBlockProps {
  data: (ILink | ICategory)[];
  title: string;
  limit?: number;
  link?: ILinkProps;
}

// COMPONENT
export const SidebarInBlock: React.FC<ISidebarInBlockProps> = ({
  data,
  title,
  link,
  limit = 5,
}) => {
  const linkText = link?.text ?? 'Link text';

  if (data === null) return null;

  const isCategoryData = 'id' in data[0];

  const renderedData = isCategoryData
    ? (data as ICategory[]).slice(0, limit)
    : (data as ILink[]);

  return (
    <aside className={styles['sidebar']}>
      <div className={styles['content']}>
        <h4>{title || 'No title'}</h4>
        <div className={styles['links']}>
          {renderedData?.map((item) => (
            <div
              className={styles['item']}
              key={
                isCategoryData ? (item as ICategory).id : (item as ILink).text
              }
            >
              <Link
                to={
                  isCategoryData
                    ? `/${(item as ICategory).id}`
                    : (item as ILink).link
                }
              >
                {isCategoryData
                  ? (item as ICategory).name
                  : (item as ILink).text}
              </Link>
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
