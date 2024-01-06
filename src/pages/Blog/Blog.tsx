// IMPORTS
// libraries
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// components
import { BlogItem } from './BlogItem/BlogItem';
import { SidebarLinks } from '@components/SidebarLinks/SidebarLinks';
import { HighlightArticle } from '@components/HighlightArticle/HighlightArticle';

// types
import { IArticle } from '@customTypes/store';
import { EItemType, EView } from '@customTypes/index';

// utils
import { handleRemoveFilter } from '@utils/helpers/array';
import { firstLettertoUppercase, getBlogLink } from '@utils/helpers/string';
import {
  useAppDispatch,
  useAppSelector,
  useFetchNews,
  useFetchNewsCategories,
  useFetchTotal,
  usePageState,
} from '@hooks/index';
import {
  MONTHS,
  BLOG_LINKS_MONTHS as MONTHS_LINKS,
  ITEMS_PER_PAGE as IPP,
} from '@utils/constants';

// styles
import styles from './Blog.module.scss';
import { setBreadcrumbs } from '@store/Slices/pageSlice';

// COMPONENT
export const Blog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const { state } = useLocation();

  const { newsData, totalPages } = useAppSelector(
    (state) => state.newsState.news
  );

  const newsCategories = useAppSelector((state) => state.newsState.categories);
  const gridView = useAppSelector((state) => state.appState.gridView);
  const itemsPerPage = useAppSelector((state) => state.pageState.itemsPerPage);
  const indexesToRenderHightlight = { first: 0, second: 2 };

  const pageTitle = category ?? 'Blog';

  const blogLink = getBlogLink(category);

  useEffect(() => {
    const breadcrumbs = [{ name: 'Blog', url: '/blog' }];

    if (category)
      breadcrumbs.push({
        name: category,
        url: `/blog/${category}`,
      });

    dispatch(setBreadcrumbs(breadcrumbs));
  }, [dispatch, category]);

  useFetchNews({
    year: state?.year,
    month: state?.month,
    category: category,
    tags: state?.tags,
    limit: itemsPerPage ?? IPP.news,
    page: state?.page ?? 1,
  });

  useFetchNewsCategories();
  useFetchTotal();

  usePageState({
    currentPage: state?.page ?? 1,
    pageURL: blogLink,
    pageType: EItemType.NEWS,
    pageTitle: pageTitle,
    pageCount: totalPages,
    itemsPerPage: IPP.news,
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
                state={{ ...state, year: null, month: null, page: 1 }}
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
                state={{
                  ...state,
                  tags: handleRemoveFilter(state.tags, tag),
                  page: 1,
                }}
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
        {newsData
          .slice(
            indexesToRenderHightlight.first,
            indexesToRenderHightlight.second
          )
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
        {newsData
          .slice(indexesToRenderHightlight.second, newsData.length)
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
        {newsData.length ? renderBlogItems() : renderNoArticlesMessage()}
      </section>
    </div>
  );
};
