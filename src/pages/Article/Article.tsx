// IMPORTS
// libraries
import { Link, useParams } from 'react-router-dom';

// placeholders
import placeholder from '/images/placeholder.png';

// store
import { useGetArticleQuery } from '../../store/API/storeApi';

// utils
import { formatDate } from '../../utils/helpers';

// styles
import styles from './Article.module.scss';

// COMPONENT
export const Article: React.FC = () => {
  const { articleId } = useParams();
  const article = useGetArticleQuery(articleId ?? '').data;
  if (!article) return null;

  const { author, category, publishedAt, title, urlToImage, content, tags } =
    article;

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
            <button className="btn btn-small btn-grey">
              <i className="icon-socials-facebook"></i> Facebook
            </button>
            <button className="btn btn-small btn-grey">
              <i className="icon-socials-pinterest"></i> Pinterest
            </button>
            <button className="btn btn-small btn-grey">
              <i className="icon-socials-twitter"></i> Twitter
            </button>
            <button className="btn btn-small btn-grey">
              <i className="icon-socials-linked"></i> Linked In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
