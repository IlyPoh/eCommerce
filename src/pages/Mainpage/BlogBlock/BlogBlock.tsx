// IMPORTS
// components
import { BlogItem } from '@pages/Blog/BlogItem/BlogItem';
import { HighlightArticle } from '@components/HighlightArticle/HighlightArticle';
// store
import { IArticle } from '@customTypes/store';

// types
import { EView } from '@customTypes/index';

// styles
import styles from './BlogBlock.module.scss';

// TYPES
interface IBlogBlockProps {
  data: IArticle[];
}

// COMPONENT
export const BlogBlock: React.FC<IBlogBlockProps> = ({ data }) => {
  if (!data || data.length == 0) return null;

  return (
    <div className={styles['blog']}>
      <HighlightArticle data={data[0]} />
      {data.length >= 2 && <BlogItem article={data[1]} view={EView.GRID} />}
      {data.length >= 3 && (
        <div className={styles['list']}>
          {data.slice(2).map((article) => (
            <BlogItem key={article.id} article={article} view={EView.LIST} />
          ))}
        </div>
      )}
    </div>
  );
};
