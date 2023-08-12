// IMPORTS
// libraries
import { Link, useLocation } from 'react-router-dom';

// placeholder
import placeholder from '/images/placeholder_32.png';

// types
import { IArticle } from '../../types/store';

// utils
import { formatDate } from '../../utils/helpers';

// styles
import styles from './HightlightArticle.module.scss';

// TYPES
interface IHighlightArticleProps {
  data: IArticle;
  link?: string;
}

// COMPONENT
export const HightlightArticle: React.FC<IHighlightArticleProps> = ({
  data,
  link = '/blog',
}) => {
  const { state } = useLocation();
  return (
    <>
      <div
        className={styles['highlight']}
        style={{ backgroundImage: `url(${data.urlToImage})` }}
      >
        <div className={styles['tags']}>
          {data?.tags?.map((tag: string) => (
            <Link
              key={tag}
              to={link}
              state={{ ...state, tag: tag }}
              className="tag"
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className={styles['body']}>
          <div className={styles['title']}>
            <h3>
              <Link to={`${link}/article/${data.id}`}>
                {data.title ?? 'No title'}
              </Link>
            </h3>
          </div>
          <div className={styles['info']}>
            <div className={styles['author']}>
              <img src={placeholder} alt={data?.author ?? 'No author'} />
              <span>{data?.author ?? 'No author'}</span>
            </div>
            <div className={styles['date']}>
              {data.publishedAt ? formatDate(`${data.publishedAt}`) : 'No date'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
