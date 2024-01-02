// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// components
import { NavBar } from '@components/NavBar/NavBar';

// assets
import logo from '@assets/images/logo.png';

// utils
import { HEADER_LINKS as links } from '@utils/constants';

// styles
import styles from './Header.module.scss';

// FUNCTIONS
const InfoLinks: React.FC<{ to: string; text: string; className?: string }> = ({
  to,
  text,
  className,
}) => (
  <Link to={to} className={className}>
    {text}
  </Link>
);

// COMPONENT
export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className="container">
        <section className={`section-medium ${styles['info']}`}>
          <div className={styles['left']}>
            <InfoLinks
              to={links.chatWithUs.link}
              text={links.chatWithUs.text}
            />
            <InfoLinks
              to={links.phone.link}
              text={links.phone.text}
              className="no-color"
            />
            <InfoLinks
              to={links.email.link}
              text={links.email.text}
              className="no-color"
            />
          </div>
          <div className={styles['right']}>
            <InfoLinks to={links.blog.link} text={links.blog.text} />
            <InfoLinks to={links.aboutUs.link} text={links.aboutUs.text} />
            <InfoLinks to={links.careers.link} text={links.careers.text} />
          </div>
        </section>
        <div className={styles['content']}>
          <div className={styles['logo']}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={styles['input']}>
            <div className={styles['search-filter']}>
              <button className="btn btn-transparent">
                All Categories{' '}
                <i className={`${styles['icon-green']} icon-chevron-down`}></i>
              </button>
            </div>
            <input type="text" placeholder="Search Products, categories ..." />
            <button className="btn btn-transparent btn-search">
              <i className="icon-actions-search" />
            </button>
          </div>
          <div className={styles['buttons']}>
            <button className="btn btn-icon">
              <i className="icon-actions-user" />
            </button>
            <button className="btn btn-icon">
              <i className="icon-ecommerce-basket" />
            </button>
          </div>
        </div>
      </div>
      <NavBar />
    </header>
  );
};
