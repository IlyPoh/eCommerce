// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// components
import { NavBar } from '../NavBar/NavBar';

// assets
import logo from '../../assets/images/logo.png';

// utils
import { HEADER_LINKS as links } from '../../utils/constants';

// styles
import styles from './Header.module.scss';

// COMPONENT
export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div className="container">
        <section className={`section-medium ${styles['info']}`}>
          <div className={styles['left']}>
            <Link to={links.chatWithUs.link}>{links.chatWithUs.text}</Link>
            <Link to={links.phone.link} className="no-color">
              {links.phone.text}
            </Link>
            <Link to={links.email.link} className="no-color">
              {links.email.text}
            </Link>
          </div>
          <div className={styles['right']}>
            <Link to={links.blog.link}>{links.blog.text}</Link>
            <Link to={links.aboutUs.link}>{links.aboutUs.text}</Link>
            <Link to={links.careers.link}>{links.careers.text}</Link>
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
