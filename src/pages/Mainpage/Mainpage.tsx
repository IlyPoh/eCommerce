// IMPORTS
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
import {
  useAppSelector,
  useFetchNews,
  useFetchReviews,
} from '../../utils/hooks';

// styles
import styles from './Mainpage.module.scss';
import { BlockHeadline } from '../../components/BlockHeadline/BlockHeadline';
import { ProductList } from '../../components/ProductList/ProductList';
import { BlogBlock } from './BlogBlock/BlogBlock';

// COMPONENT
export const Mainpage: React.FC = () => {
  const categoryData = useAppSelector(
    (state) => state.categoryState.categories
  );
  const reviewData = useAppSelector((state) => state.reviewsState.reviews);
  const newsData = useAppSelector((state) => state.newsState.news);
  console.log('🚀 ~ file: Mainpage.tsx:31 ~ newsData:', newsData);

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

  useFetchReviews();
  useFetchNews({ limit: 5 });

  return (
    <>
      {categoryData && (
        <div className="container">
          <section className={styles['section']}>
            <TwoBlocks categoryData={categoryData} />
          </section>
        </div>
      )}
      {firstSidebarData && (
        <div className="container">
          <section className={styles['section']}>
            <BlockWithProducts
              sidebarData={firstSidebarData}
              productList={{ list: [1, 2, 3] }}
            />
          </section>
        </div>
      )}
      {secondSidebarData && (
        <div className="container">
          <section className={styles['section']}>
            <BlockWithProducts
              sidebarData={secondSidebarData}
              productList={{ list: [5, 7, 16] }}
            />
          </section>
        </div>
      )}
      {reviewData && (
        <section className={styles['section']}>
          <ReviewList
            data={reviewData}
            title="Our customers says"
            link={{ icon: 'icon-chevron-right' }}
          />
        </section>
      )}
      <div className="container">
        <section className={styles['section']}>
          <BlockHeadline />
          <ProductList list={[3, 5, 1, 20]} limit={4} />
        </section>
      </div>
      <div className="container">
        <section className={styles['section']}>
          <BlockHeadline
            title="Read our Blog posts"
            link={{ link: '/blog', text: 'Go to Blog' }}
          />
          <BlogBlock data={newsData} />
        </section>
      </div>
    </>
  );
};
