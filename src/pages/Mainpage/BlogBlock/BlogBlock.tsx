// IMPORTS
// placeholder image
import { Link } from 'react-router-dom';
import placeholder from '../../../../db/images/placeholder.png';

// store
import { IArticle } from '../../../types/store';
import { formatDate } from '../../../utils/helpers';

// styles
import styles from './BlogBlock.module.scss';

// TYPES
interface IBlogBlockProps {
  data: IArticle[];
}

interface IDefaultTags {
  1: string[];
  2: string[];
}

// if data[0] and data[1] have no tags, use default tags
const defaultTags: IDefaultTags = {
  1: ['Dinner tips'],
  2: ['Vegetable'],
};

// COMPONENT
export const BlogBlock: React.FC<IBlogBlockProps> = ({ data }) => {
  if (!data || data.length == 0) return null;
  return (
    <>
      <div className={styles['blog']}>
        <div
          className={styles['highlight']}
          style={{ backgroundImage: `url(${data[0]?.urlToImage})` }}
        >
          <div className={styles['tags']}>
            {(data[0].tags ?? defaultTags[1]).map((tag) => (
              <div className="tag" key={tag}>
                {tag}
              </div>
            ))}
          </div>
          <div className={styles['body']}>
            <div className={styles['title']}>
              <h3>
                <Link to={`/blog/${data[0].id}`}>
                  {data[0].title ?? 'No title'}
                </Link>
              </h3>
            </div>
            <div className={styles['info']}>
              <div className={styles['author']}>
                <img src={placeholder} alt={data[0]?.author ?? 'No author'} />
                <span>{data[0]?.author ?? 'No author'}</span>
              </div>
              <div className={styles['date']}>
                {data[0].publishedAt
                  ? formatDate(`${data[0].publishedAt}`)
                  : 'No date'}
              </div>
            </div>
          </div>
        </div>
        {data.length >= 2 && (
          <div className={styles['second']}>
            <img
              className={styles['image']}
              src={data[1].urlToImage}
              alt={data[1].title}
              width={300}
            />
            <div className={styles['tags']}>
              {(data[1].tags ?? defaultTags[2]).map((tag) => (
                <div className="tag" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
            <div className={styles['title']}>
              <h4>
                <Link to={`/blog/${data[1].id}`}>
                  {data[1].title ?? 'No title'}
                </Link>
              </h4>
            </div>
            <div className={styles['info']}>
              <span>{data[1].author}</span>
              <span>{formatDate(`${data[1].publishedAt}`)}</span>
            </div>
          </div>
        )}
        {data.length >= 3 && (
          <div className={styles['list']}>
            {data.slice(2).map((article) => (
              <div className={styles['item']} key={article.id}>
                <div className={styles['body']}>
                  <div className={styles['title']}>
                    <Link to={`/blog/${article.id}`}>
                      {article.title ?? 'No title'}
                    </Link>
                  </div>
                  <div className={styles['info']}>
                    <span>{article.author}</span>
                    <span>{formatDate(`${article.publishedAt}`)}</span>
                  </div>
                </div>
                <img
                  className={styles['image']}
                  src={article.urlToImage}
                  alt={article.title}
                  width={96}
                  height={96}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
