// IMPORTS
// libraries
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// placeholders
import placeholder from '/images/placeholder.png';

// store
import { setBreadcrumbs } from '../../store/Slices/pageSlice';
import { useGetArticleQuery } from '../../store/API/storeApi';

// utils
import { formatDate } from '../../utils/helpers';
import { useAppDispatch } from '../../utils/hooks';

// styles
import styles from './Article.module.scss';

// COMPONENT
export const Article: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articleId } = useParams();
  const article = useGetArticleQuery(articleId ?? '').data;

  useEffect(() => {
    if (article) {
      const breadcrumbs = [
        { name: 'Blog', url: '/blog' },
        { name: article.category, url: `/blog/${article.category}` },
        {
          name: article.title,
          url: `/blog/article/${article.id}`,
        },
      ];

      dispatch(setBreadcrumbs(breadcrumbs));
    }
  }, [dispatch, article]);

  if (!article) return null;

  const { author, category, publishedAt, title, urlToImage, content, tags } =
    article;

  const socialButton = (classNames: string, icon: string, text: string) => (
    <button className={classNames}>
      <i className={icon}></i> {text}
    </button>
  );

  return (
    <div className="container">
      <section>
        <div
          className={styles['header']}
          style={{ backgroundImage: `url(${urlToImage ?? placeholder})` }}
        >
          <aside className={styles['info']}>
            <div className={styles['item']}>
              <span className={styles['category']}>Date:</span>
              <span>{formatDate(`${publishedAt}`)}</span>
            </div>
            <div className={styles['item']}>
              <span className={styles['category']}>Category:</span>
              <span>
                <Link to={`/blog/${category}`} className={styles['link']}>
                  {category}
                </Link>
              </span>
            </div>
            <div className={styles['item']}>
              <span className={styles['category']}>Author:</span>
              <span className={styles['link']}>{author}</span>
            </div>
          </aside>
          <div className={styles['content']}>
            <h1>{title}</h1>
          </div>
        </div>
      </section>
      <section className={styles['body']}>
        <aside className={styles['info']}>
          <div className={styles['tags']}>
            <h4>Tags</h4>
            <div className={styles['list']}>
              {tags?.map((tag) => (
                <Link
                  to="/blog"
                  state={{ tags: [tag] }}
                  key={tag}
                  className="tag tag-green"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles['back']}>
            <Link className="btn" to="/blog">
              <i className="icon-directions-left"></i> Back to blog
            </Link>
          </div>
        </aside>
        <div className={styles['content']}>
          <article
            className={styles['article']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className={styles['share']}>
            <span>Share</span>
            {socialButton(
              'btn btn-small btn-grey',
              'icon-socials-facebook',
              'Facebook'
            )}
            {socialButton(
              'btn btn-small btn-grey',
              'icon-socials-pinterest',
              'Pinterest'
            )}
            {socialButton(
              'btn btn-small btn-grey',
              'icon-socials-twitter',
              'Twitter'
            )}
            {socialButton(
              'btn btn-small btn-grey',
              'icon-socials-linked',
              'Linked In'
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
