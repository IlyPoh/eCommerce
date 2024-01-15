// IMPORTS
// libraries
import { Outlet } from 'react-router-dom';

// components
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

// styles
import styles from './Layout.module.scss';

// COMPONENT
export const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <main className={styles['content']}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
