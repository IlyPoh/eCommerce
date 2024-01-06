// IMPORTS
// libraries
import { Link, useLocation } from 'react-router-dom';

// placeholders
import placeholderArticle from '/images/placeholder.png';
import placeholderAuthor from '/images/placeholder_32.png';

// types
import { IArticle } from '@customTypes/store';

// utils
import { formatDate } from '@utils/helpers/string';
import { handleAddFilter } from '@utils/helpers/array';

// styles
import styles from './HighlightArticle.module.scss';

// TYPES
interface IHighlightArticleProps {
  data: IArticle;
  link?: string;
}

// COMPONENT
export const HighlightArticle: React.FC<IHighlightArticleProps> = ({
  data,
  link = '/blog',
}) => {
  const { state } = useLocation();

  return (
    <div
      className={styles['highlight']}
      style={{ backgroundImage: `url(${data.urlToImage})` }}
    >
      <div className={styles['tags']}>
        {data?.tags?.map((tag: string) => (
          <Link
            key={tag}
            to={link}
            state={{
              ...state,
              tags: handleAddFilter(state?.tags || [], tag),
            }}
            className="tag tag-green"
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className={styles['body']}>
        <div className={styles['title']}>
          <h3>
            <Link to={`/blog/${data.category}/${data.id}`}>
              {data.title ?? 'No title'}
            </Link>
          </h3>
        </div>
        <div className={styles['info']}>
          <div className={styles['author']}>
            <img
              src={placeholderAuthor}
              alt={data?.author ?? 'No author'}
              onError={(e) => (e.currentTarget.src = `${placeholderArticle}`)}
            />
            <span>{data?.author ?? 'No author'}</span>
          </div>
          <div className={styles['date']}>
            {data.publishedAt ? formatDate(`${data.publishedAt}`) : 'No date'}
          </div>
        </div>
      </div>
    </div>
  );
};
