// IMPORTS
// components
import { TwoBlocks } from './TwoBlocks/TwoBlocks';
import { BlogBlock } from './BlogBlock/BlogBlock';
import { ReviewList } from './ReviewBlockList/ReviewList';
import { ProductList } from '../../components/ProductList/ProductList';
import { ISidebarLinksProps } from '../../components/SidebarLinks/SidebarLinks';
import { BlockWithProducts } from './BlockWithProducts/BlockWithProducts';
import { BlockHeadline } from '../../components/BlockHeadline/BlockHeadline';

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

// COMPONENT
export const Mainpage: React.FC = () => {
  const categoryData = useAppSelector(
    (state) => state.categoryState.categories
  );
  const newsData = useAppSelector((state) => state.newsState.news);
  const reviewData = useAppSelector((state) => state.reviewsState.reviews);

  const firstSidebarData: ISidebarLinksProps = {
    data: firstLinks,
    title: 'Best selling products',
    link: { text: 'More products', icon: 'icon-chevron-right' },
  };

  const secondSidebarData: ISidebarLinksProps = {
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
          <section className="section">
            <TwoBlocks categoryData={categoryData} />
          </section>
        </div>
      )}
      {firstSidebarData && (
        <div className="container">
          <section className="section">
            <BlockWithProducts
              sidebarData={firstSidebarData}
              productList={{ list: [1, 2, 3] }}
            />
          </section>
        </div>
      )}
      {secondSidebarData && (
        <div className="container">
          <section className="section">
            <BlockWithProducts
              sidebarData={secondSidebarData}
              productList={{ list: [5, 7, 16] }}
            />
          </section>
        </div>
      )}
      {reviewData && (
        <section className="section">
          <ReviewList
            data={reviewData}
            title="Our customers says"
            link={{ icon: 'icon-chevron-right' }}
          />
        </section>
      )}
      <div className="container">
        <section className="section">
          <BlockHeadline />
          <ProductList list={[3, 5, 1, 20]} limit={4} />
        </section>
      </div>
      <div className="container">
        <section className="section">
          <BlockHeadline
            title="Read our Blog posts"
            link={{ link: '/blog', text: 'Go to Blog' }}
          />
          {newsData.length ? (
            <BlogBlock data={newsData} />
          ) : (
            <div className="text-center">
              <h3>No Articles</h3>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
