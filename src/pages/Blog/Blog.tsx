// IMPORTS
// components
import { useParams } from 'react-router-dom';
import { BlogItem } from '../../components/BlogItem/BlogItem';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { PageHeadline } from '../../components/PageHeadline/PageHeadline';
import { SidebarInBlock } from '../../components/SidebarInBlock/SidebarInBlock';
import { HightlightArticle } from '../../components/HightlightArticle/HightlightArticle';

// types
import { IArticle } from '../../types/store';
import { EType, EView, IPaginationIndexes } from '../../types';

// utils
import { getPaginationIndexes } from '../../utils/helpers';
import { useAppSelector, useFetchNews } from '../../utils/hooks';
import {
  BLOG_LINKS_MONTHS as MONTHS,
  BLOG_LINKS_CATEGORIES as CATEGORIES,
} from '../../utils/constants';

// styles
import styles from './Blog.module.scss';

// COMPONENT
export const Blog: React.FC = () => {
  const { year, month, tag, page = 1 } = useParams();
  const newsData = useAppSelector((state) => state.newsState.news);
  const gridView = useAppSelector((state) => state.appState.gridView);
  const newsPerPage = 11;
  const productIndexesToRender: IPaginationIndexes = getPaginationIndexes(
    Number(page),
    newsPerPage
  );
  const productHighlightLastIndex = productIndexesToRender.start + 2;

  useFetchNews({
    year: Number(year),
    month: Number(month),
    category: tag,
  });

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <PageHeadline title="Blog" type={EType.NEWS} />
        {newsData.length ? (
          <section className={styles['headline']}>
            {newsData
              .slice(0, productHighlightLastIndex)
              .map((article: IArticle) => (
                <HightlightArticle data={article} key={article.id} />
              ))}
          </section>
        ) : null}
        <section className={styles['body']}>
          <aside>
            <SidebarInBlock data={MONTHS} title="Archives" />
            <div className={styles['categories']}>
              <SidebarInBlock data={CATEGORIES} title="Category" />
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
                  />
                ))
            ) : (
              <div className="text-center">
                <h2>No Articles</h2>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
