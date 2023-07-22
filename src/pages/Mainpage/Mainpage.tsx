// components
import { TwoBlocks } from './TwoBlocks/TwoBlocks';
import { ReviewList } from './ReviewBlockList/ReviewList';
import { ISidebarInBlockProps } from './SidebarInBlock/SidebarInBlock';
import { BlockWithProducts } from './BlockWithProducts/BlockWithProducts';

// utils
import {
  FIRST_SIDEBAR_LINKS as firstLinks,
  SECOND_SIDEBAR_LINKS as secondLinks,
} from '../../utils/constants';
import { useAppSelector } from '../../utils/hooks';

// styles
import styles from './Mainpage.module.scss';
import { BlockHeadline } from '../../components/BlockHeadline/BlockHeadline';
import { ProductList } from '../../components/ProductList/ProductList';

export const Mainpage: React.FC = () => {
  const categoryData = useAppSelector(
    (state) => state.categoryState.categories
  );
  const reviewData = useAppSelector((state) => state.reviewsState.reviews);

  const firstSidebarData: ISidebarInBlockProps = {
    data: firstLinks,
    title: 'Best selling products',
    link: { text: 'More products', icon: 'icon-chevron-right' },
  };

  const secondSidebarData: ISidebarInBlockProps = {
    data: secondLinks,
    title: 'Best from Farmers',
    link: { text: 'More products', icon: 'icon-chevron-right' },
  };

  return (
    <>
      {categoryData && (
        <div className="container">
          <div className={styles['section']}>
            <TwoBlocks categoryData={categoryData} />
          </div>
        </div>
      )}
      {firstSidebarData && (
        <div className="container">
          <div className={styles['section']}>
            <BlockWithProducts
              sidebarData={firstSidebarData}
              productList={{ list: [1, 2, 3] }}
            />
          </div>
        </div>
      )}
      {secondSidebarData && (
        <div className="container">
          <div className={styles['section']}>
            <BlockWithProducts
              sidebarData={secondSidebarData}
              productList={{ list: [5, 7, 16] }}
            />
          </div>
        </div>
      )}
      {reviewData && (
        <div className={styles['section']}>
          <ReviewList
            data={reviewData}
            title="Our customers says"
            link={{ icon: 'icon-chevron-right' }}
          />
        </div>
      )}
      <div className="container">
        <div className={styles['section']}>
          <BlockHeadline />
          <ProductList list={[3, 5, 1, 20]} limit={4} />
        </div>
      </div>
    </>
  );
};
