// IMPORTS
// components
import { FooterTags } from '../FooterTags/FooterTags';
import { FooterColumn } from '../FooterColumn/FooterColumn';

// utils
import { FOOTER_LINKS as links, COPYRIGHT } from '../../utils/constants';

// styles
import styles from './Footer.module.scss';

// COMPONENT
export const Footer: React.FC = () => {
  return (
    <>
      <footer className={styles['footer']}>
        <div className="container">
          <div className={styles['sections']}>
            <div className={styles['columns']}>
              {links.map((column) => (
                <FooterColumn column={column} key={column.title} />
              ))}
            </div>
            <FooterTags />
            <div className={styles['copyright']}>{COPYRIGHT}</div>
          </div>
        </div>
      </footer>
    </>
  );
};
