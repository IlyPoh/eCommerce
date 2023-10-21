// IMPORTS
// libraries
import { Link, useLocation, useParams } from 'react-router-dom';

// components
import { BlogItem } from './BlogItem/BlogItem';
import { SidebarLinks } from '../../components/SidebarLinks/SidebarLinks';
import { HighlightArticle } from '../../components/HighlightArticle/HighlightArticle';

// types
import { IArticle } from '../../types/store';
import { EItemType, EView, IPaginationIndexes } from '../../types';

// utils
import {
  firstLettertoUppercase,
  getBlogLink,
  getPaginationIndexes,
  handleRemoveFilter,
} from '../../utils/helpers';
import {
  useAppSelector,
  useFetchNews,
  useFetchNewsCategories,
  usePageState,
} from '../../utils/hooks';
import {
  MONTHS,
  BLOG_LINKS_MONTHS as MONTHS_LINKS,
} from '../../utils/constants';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  const { category } = useParams();
  const { state } = useLocation();

  const newsData = useAppSelector((state) => state.newsState.news);
  const newsCategories = useAppSelector((state) => state.newsState.categories);
  const gridView = useAppSelector((state) => state.appState.gridView);
  const itemsPerPage = useAppSelector((state) => state.pageState.itemsPerPage);

  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    state?.page ?? 1,
    itemsPerPage
  );

  const pageTitle = category ?? 'Blog';

  const blogLink = getBlogLink(category);
  const productHighlightLastIndex = productIndexesToRender.start + 2;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  useFetchNews({
    year: state?.year,
    month: state?.month,
    category: category,
    tags: state?.tags,
  });

  useFetchNewsCategories();

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: blogLink,
    pageType: EItemType.NEWS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    itemsPerPage: 11,
    itemCount: newsData.length,
  });

  const filteredData = newsData.filter((article: IArticle) => {
    if (!state?.tags?.length) return true;
    else return state.tags.every((tag: string) => article.tags?.includes(tag));
  });

  const renderFilter = () => {
    return (
      <section className={`section-small ${styles['filter']}`}>
        {state?.year && state?.month && (
          <>
            <div className={styles['text']}>Filtered by date:</div>
            <div className={styles['date']}>
              <Link
                to="/blog"
                state={{ ...state, year: null, month: null }}
                className="tag tag-green"
              >
                {MONTHS[Number(state?.month) - 1]} {state?.year}
                <i className="icon-actions-close-simple"></i>
              </Link>
            </div>
          </>
        )}

        {state?.tags?.length && (
          <>
            <div className={styles['text']}>Filtered by tags:</div>
            {state?.tags.map((tag: string) => (
              <Link
                className="tag tag-green"
                key={tag}
                to={blogLink}
                state={{ ...state, tags: handleRemoveFilter(state.tags, tag) }}
              >
                {firstLettertoUppercase(tag)}
                <i className="icon-actions-close-simple"></i>
              </Link>
            ))}
          </>
        )}
      </section>
    );
  };

  const renderHighlightArticles = () => {
    return (
      <section className={styles['headline']}>
        {filteredData
          .slice(productIndexesToRender.start, productHighlightLastIndex)
          .map((article: IArticle) => (
            <HighlightArticle data={article} key={article.id} link={blogLink} />
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
        {filteredData
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
    <div className="container">
      {(state?.year && state?.month) || state?.tags?.length
        ? renderFilter()
        : null}
      {!!newsData.length && renderHighlightArticles()}
      <section className={styles['body']}>
        <aside>
          {MONTHS_LINKS && (
            <SidebarLinks data={MONTHS_LINKS} title="Archives" />
          )}
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
        {filteredData.length ? renderBlogItems() : renderNoArticlesMessage()}
      </section>
    </div>
  );
};
