// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// types
import { ILinkProps } from '@/types';

// styles
import styles from './BannerBlock.module.scss';

//  TYPES
interface IBannerBlockProps {
  title: string;
  subtitle: string;
  link: ILinkProps;
}

//  COMPONENT
export const BannerBlock: React.FC<Partial<IBannerBlockProps>> = ({
  title,
  subtitle,
  link,
}) => {
  let linkText;

  if (link?.text) {
    linkText = link.text;
  } else {
    linkText = 'Button text';
  }

  return (
    <div className={styles['banner']}>
      <div className={styles['banner-background']}>
        <div className={styles['banner-header']}>
          <div className={styles['banner-subtitle']}>
            {subtitle ?? 'Banner subfocus'}
          </div>
          <h3>{title ?? 'Space for heading'}</h3>
        </div>
        <Link className='btn btn-medium btn-no-bg' to={link?.link ?? '/'}>
          {linkText}
          <i className={link?.icon}></i>
        </Link>
      </div>
    </div>
  );
};
