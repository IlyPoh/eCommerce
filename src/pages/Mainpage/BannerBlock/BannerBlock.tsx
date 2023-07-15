// libraries
import { Link } from 'react-router-dom';

// components
import { Button } from '../../../components/UI/Button/Button';

// types
import { IButtonWithLinkProps } from '../../../types';

// styles
import styles from './BannerBlock.module.scss';

interface IBannerBlockProps {
  title?: string;
  subtitle?: string;
  button?: IButtonWithLinkProps;
  children?: React.ReactNode;
}

export const BannerBlock: React.FC<IBannerBlockProps> = ({
  title,
  subtitle,
  button,
}) => {
  let buttonText;

  if (button?.text) {
    buttonText = button.text;
  } else {
    buttonText = 'Button text';
  }

  return (
    <>
      <div className={styles['banner']}>
        <div className={styles['banner-background']}>
          <div className={styles['banner-header']}>
            <div className={styles['banner-subtitle']}>
              {subtitle ? subtitle : 'Banner subfocus'}
            </div>
            <h3>{title ? title : 'Space for heading'}</h3>
          </div>
          <Button classes="btn btn-medium btn-no-bg" icon={button?.icon}>
            <Link to={button?.link ?? '/'}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
