// IMPORTS
// libraries
import { Link, useParams } from 'react-router-dom';

// styles
import styles from './Article.module.scss';
import { useGetArticleQuery } from '../../store/API/storeApi';
import { formatDate } from '../../utils/helpers';
import { Button } from '../../components/UI/Button/Button';

// COMPONENT
export const Article: React.FC = () => {
  const { articleId } = useParams();
  const article = useGetArticleQuery(articleId ?? '').data;
  if (!article) return null;

  const { author, category, publishedAt, title, urlToImage, content, tags } =
    article;

  return (
    <>
      <div className="container">
        <section>
          <div
            className={styles['header']}
            style={{ backgroundImage: `url(${urlToImage})` }}
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
                    state={{ tag: tag }}
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles['back']}>
              <Link className="btn" to="/blog">
                <i className="icon-directions-left"></i>
                Back to blog
              </Link>
            </div>
          </aside>
          <div className={styles['content']}>
            <div className={styles['article']}>{content}</div>
            <div className={styles['share']}>
              <span>Share</span>
              <Button className="btn btn-small btn-grey">
                <i className="icon-socials-facebook"></i>
                Facebook
              </Button>
              <Button className="btn btn-small btn-grey">
                <i className="icon-socials-pinterest"></i>
                Pinterest
              </Button>
              <Button className="btn btn-small btn-grey">
                <i className="icon-socials-twitter"></i>
                Twitter
              </Button>
              <Button className="btn btn-small btn-grey">
                <i className="icon-socials-linked"></i>
                Linked In
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
