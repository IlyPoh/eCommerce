// IMPORTS
// libraries
import { Link, useLocation } from 'react-router-dom';

// placeholders
import placeholder from '/images/placeholder.png';

// utils
import { formatDate } from '@/utils/helpers/string';
import { handleAddFilter } from '@/utils/helpers/array';

// types
import { EView } from '@/types';
import { IArticle } from '@/types/store';

// styles
import styles from './BlogItem.module.scss';

// TYPES
interface IBlogItemProps {
  article: IArticle;
  view: EView;
  link?: string;
}

// COMPONENT
export const BlogItem: React.FC<IBlogItemProps> = ({
  article,
  view,
  link = '/blog',
}) => {
  const { state } = useLocation();

  if (!article) return null;

  const productLink = () => (
    <Link to={`${link}/${article.category}/${article.id}`}>
      {article.title}
    </Link>
  );

  return (
    <div className={`${styles['item']} ${styles[view]}`}>
      <Link
        className={styles['image']}
        to={`/blog/${article.category}/${article.id}`}
      >
        <img
          src={article.urlToImage ?? placeholder}
          width={300}
          alt={article.title}
          onError={e => (e.currentTarget.src = `${placeholder}`)}
        />
      </Link>
      <div className={styles['body']}>
        {view === EView.GRID && (
          <div className={styles['tags']}>
            {article?.tags?.map(tag => (
              <Link
                className='tag tag-green'
                to={link}
                state={{
                  ...state,
                  tags: handleAddFilter(state?.tags || [], tag),
                  page: 1,
                }}
                key={tag}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <div className={styles['title']}>
          {view === EView.GRID ? <h4>{productLink()}</h4> : productLink()}
        </div>
        <div className={styles['info']}>
          <span className={styles['author']}>{article.author}</span>
          <span>{formatDate(`${article.publishedAt}`)}</span>
        </div>
      </div>
    </div>
  );
};
