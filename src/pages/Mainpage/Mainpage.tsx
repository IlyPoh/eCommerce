// components
import { TwoBlocks } from './TwoBlocks/TwoBlocks';
import { BlockWithProducts } from './BlockWithProducts/BlockWithProducts';

// utils
import {
  FIRST_SIDEBAR_LINKS as firstLinks,
  SECOND_SIDEBAR_LINKS as secondLinks,
} from '../../utils/constants';
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './Mainpage.module.scss';
import { ISidebarInBlockProps } from './SidebarInBlock/SidebarInBlock';

export const Mainpage: React.FC = () => {
  const categoryData = useAppSelector(
    (state) => state.categoryState.categories
  );

  const firstSidebarData: ISidebarInBlockProps = {
    data: firstLinks,
    title: 'Best selling products',
    button: { text: 'More products', icon: 'icon-chevron-right' },
  };

  const secondSidebarData: ISidebarInBlockProps = {
    data: secondLinks,
    title: 'Best selling products',
    button: { text: 'More products', icon: 'icon-chevron-right' },
  };

  return (
    <>
      <div className="container">
        <div className={styles['section']}>
          {categoryData && <TwoBlocks categoryData={categoryData} />}
        </div>
      </div>
      <div className="container">
        <div className={styles['section']}>
          <BlockWithProducts
            sidebarData={firstSidebarData}
            productList={{ list: [1, 2, 3] }}
          />
        </div>
      </div>
      <div className="container">
        <div className={styles['section']}>
          <BlockWithProducts
            sidebarData={secondSidebarData}
            productList={{ list: [5, 7, 16] }}
          />
        </div>
      </div>
    </>
  );
};
