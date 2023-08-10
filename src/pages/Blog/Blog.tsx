// IMPORTS
// libraries
import { useParams } from 'react-router-dom';

// components
import { BlogItem } from './BlogItem/BlogItem';
import { Pagination } from '../../components/Pagination/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { PageHeadline } from '../../components/PageHeadline/PageHeadline';
import { SidebarLinks } from '../../components/SidebarLinks/SidebarLinks';
import { HightlightArticle } from '../../components/HightlightArticle/HightlightArticle';

// types
import { IArticle } from '../../types/store';
import { EType, EView, IPaginationIndexes } from '../../types';

// utils
import { getBlogLink, getPaginationIndexes } from '../../utils/helpers';
import {
  useAppSelector,
  useFetchNews,
  useFetchNewsCategories,
} from '../../utils/hooks';
import { BLOG_LINKS_MONTHS as MONTHS } from '../../utils/constants';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  const { year, month, category, tag, page = 1 } = useParams();
  console.log('page:', page);
  console.log('tag:', tag);
  console.log('category:', category);
  console.log('month:', month);
  console.log('year:', year);
  const newsData = useAppSelector((state) => state.newsState.news);
  const newsCategories = useAppSelector((state) => state.newsState.categories);
  const gridView = useAppSelector((state) => state.appState.gridView);
  const newsPerPage = 11;
  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    Number(page),
    newsPerPage
  );
  const blogLink = getBlogLink(category, month, year);
  const productHighlightLastIndex = productIndexesToRender.start + 2;
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  useFetchNews({
    year: Number(year),
    month: Number(month),
    category: category,
    tag: tag,
  });

  useFetchNewsCategories();

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <PageHeadline title="Blog" type={EType.NEWS} />
        {newsData.length ? (
          <section className={styles['headline']}>
            {newsData
              .slice(productIndexesToRender.start, productHighlightLastIndex)
              .map((article: IArticle) => (
                <HightlightArticle
                  data={article}
                  key={article.id}
                  link={blogLink}
                />
              ))}
          </section>
        ) : null}
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
          <div
            className={`${styles['content']} ${
              gridView ? styles[EView.GRID] : styles[EView.LIST]
            }`}
          >
            {newsData.length ? (
              productIndexesToRender &&
              newsData
                .slice(productHighlightLastIndex, productIndexesToRender.end)
                .map((article: IArticle) => (
                  <BlogItem
                    article={article}
                    key={article.id}
                    view={gridView ? EView.GRID : EView.LIST}
                    tagLink={blogLink}
                  />
                ))
            ) : (
              <div className="text-center">
                <h2>No Articles</h2>
              </div>
            )}
          </div>
        </section>
        <section className="section-small">
          <Pagination
            currentPage={Number(page)}
            totalPages={totalPages}
            link={blogLink}
            type={EType.NEWS}
          />
        </section>
      </div>
    </>
  );
};
