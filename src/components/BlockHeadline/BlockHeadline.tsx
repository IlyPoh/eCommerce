// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// types
import { ILinkProps } from '../../types';

// styles
import styles from './BlockHeadline.module.scss';

interface IBlockHeadlineProps {
  title?: string;
  link?: ILinkProps;
}

// COMPONENT
export const BlockHeadline: React.FC<IBlockHeadlineProps> = ({
  title,
  link,
}) => {
  const linkText = link?.text ? link.text : 'Button';

  return (
    <>
      <div className={styles['title']}>
        <h4>{title ? title : 'Section Headline'}</h4>
        <Link className="btn btn-small btn-transparent" to={link?.link ?? '/'}>
          {linkText}
          <i className={link?.icon ?? 'icon-chevron-right'} />
        </Link>
      </div>
    </>
  );
};
