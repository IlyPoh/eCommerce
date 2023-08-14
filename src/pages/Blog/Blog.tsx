// IMPORTS
// libraries
import { useLocation, useParams } from 'react-router-dom';

// components
import { BlogItem } from './BlogItem/BlogItem';
import { SidebarLinks } from '../../components/SidebarLinks/SidebarLinks';
import { HighlightArticle } from '../../components/HighlightArticle/HighlightArticle';

// types
import { IArticle } from '../../types/store';
import { EItemType, EView, IPaginationIndexes } from '../../types';

// utils
import { getBlogLink, getPaginationIndexes } from '../../utils/helpers';
import {
  useAppSelector,
  useFetchNews,
  useFetchNewsCategories,
  usePageState,
} from '../../utils/hooks';
import { BLOG_LINKS_MONTHS as MONTHS } from '../../utils/constants';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  const { category } = useParams();
  const { state } = useLocation();

  const newsData = useAppSelector((state) => state.newsState.news);
  const newsCategories = useAppSelector((state) => state.newsState.categories);
  const gridView = useAppSelector((state) => state.appState.gridView);

  const newsPerPage = 11;
  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    state?.page ?? 1,
    newsPerPage
  );

  const pageTitle = category ?? 'Blog';

  const blogLink = getBlogLink(category);
  const productHighlightLastIndex = productIndexesToRender.start + 2;
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  useFetchNews({
    year: state?.year,
    month: state?.month,
    category: category,
    tag: state?.tag,
  });

  useFetchNewsCategories();

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: blogLink,
    pageType: EItemType.NEWS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    productCount: newsData.length,
  });

  const renderHighlightArticles = () => {
    return (
      <section className={styles['headline']}>
        {newsData
          .slice(productIndexesToRender.start, productHighlightLastIndex)
          .map((article: IArticle) => (
            <HighlightArticle data={article} key={article.id} />
          ))}
      </section>
    );
  };

  const renderBlogItems = () => {
    return (
      <div
        className={`${styles['content']}
          ${gridView ? styles[EView.GRID] : styles[EView.LIST]}
        `}
      >
        {newsData
          .slice(productHighlightLastIndex, productIndexesToRender.end)
          .map((article: IArticle) => (
            <BlogItem
              article={article}
              key={article.id}
              view={gridView ? EView.GRID : EView.LIST}
            />
          ))}
      </div>
    );
  };

  const renderNoArticlesMessage = () => {
    return (
      <div className={styles['content']}>
        <div className="text-center">
          <h2>No Articles</h2>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        {!!newsData.length && renderHighlightArticles()}
        <section className={styles['body']}>
          <aside>
            {MONTHS && <SidebarLinks data={MONTHS} title="Archives" />}
            {newsCategories && (
              <div className={styles['categories']}>
                <SidebarLinks data={newsCategories} title="Category" />
              </div>
            )}
            <div className={styles['subscription']}>
              <h4>Join our list</h4>
              <p>
                Signup to be the first to hear about exclusive deals, special
                offers, recepies from our masters and others.
              </p>
            </div>
          </aside>
          {newsData.length > 0 ? renderBlogItems() : renderNoArticlesMessage()}
        </section>
      </div>
    </>
  );
};
