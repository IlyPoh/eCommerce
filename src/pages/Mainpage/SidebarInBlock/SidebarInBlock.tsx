// libraries
import { Link } from 'react-router-dom';

// components
import { Button } from '../../../components/UI/Button/Button';

// types
import { ICategory } from '../../../types/store';
import { IButtonWithLinkProps, ILink } from '../../../types';

// styles
import styles from './SidebarInBlock.module.scss';

export interface ISidebarInBlockProps {
  data: (ILink | ICategory)[];
  title: string;
  limit?: number;
  button?: IButtonWithLinkProps;
}

export const SidebarInBlock: React.FC<ISidebarInBlockProps> = ({
  data,
  title,
  limit = 5,
  button,
}) => {
  const buttonText = button?.text ?? 'Button text';

  if (data === null) return null;

  const isCategoryData = 'id' in data[0];

  const renderedData = isCategoryData
    ? (data as ICategory[]).slice(0, limit)
    : (data as ILink[]);

  return (
    <div className={styles['sidebar']}>
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
      <Button classes="btn btn-medium btn-grey" icon={button?.icon}>
        <Link to={button?.link ?? '/'}>{buttonText}</Link>
      </Button>
    </div>
  );
};
