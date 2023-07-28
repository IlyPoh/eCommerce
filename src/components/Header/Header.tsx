// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// components
import { NavBar } from '../NavBar/NavBar';
import { Button } from '../UI/Button/Button';

// assets
import logo from '../../assets/images/logo.png';

// utils
import { HEADER_LINKS as links } from '../../utils/constants';

// styles
import styles from './Header.module.scss';

// COMPONENT
export const Header: React.FC = () => {
  return (
    <>
      <div className={styles['header']}>
        <div className="container">
          <div className={styles['info']}>
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
          </div>
          <div className={styles['content']}>
            <div className={styles['logo']}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className={styles['input']}>
              <div className={styles['search-filter']}>
                <Button className="btn btn-transparent">
                  All Categories{' '}
                  <span
                    className={`${styles['icon-green']} icon-chevron-down`}
                  ></span>
                </Button>
              </div>
              <input
                type="text"
                placeholder="Search Products, categories ..."
              />
              <Button
                className="btn btn-transparent btn-search"
                icon="icon-actions-search"
              />
            </div>
            <div className={styles['buttons']}>
              <Button className="btn btn-icon" icon="icon-actions-user" />
              <Button className="btn btn-icon" icon="icon-ecommerce-basket" />
            </div>
          </div>
        </div>
        <nav className={styles['nav']}>
          <div className="container">
            <NavBar />
          </div>
        </nav>
      </div>
    </>
  );
};
