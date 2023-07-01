// libraries
import { Outlet } from 'react-router-dom';

// components
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

// styles
import styles from './Layout.module.scss';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <div className={styles['content']}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
