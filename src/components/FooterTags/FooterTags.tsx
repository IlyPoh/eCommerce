// IMPORTS
// libraries
import { Link } from 'react-router-dom';

// utils
import { firstLettertoUppercase } from '@/utils/helpers/string';

// utils
import { useAppSelector } from '@/hooks';

// styles
import styles from './FooterTags.module.scss';

// COMPONENT
export const FooterTags = (): React.JSX.Element => {
  const tags = useAppSelector((state) => state.tagsState.tags);

  return (
    <>
      <h4>Product tags</h4>
      <div className={styles['tags']}>
        {tags.length ? (
          tags.map((tag) => (
            <Link
              to={`/tag/${tag.id}`}
              key={tag.id}
              className={styles['tags-tag']}
            >
              {firstLettertoUppercase(tag.name)}
            </Link>
          ))
        ) : (
          <div className={styles['no-tags']}>No tags</div>
        )}
      </div>
    </>
  );
};
