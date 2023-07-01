// libraries
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// utils
import { firstLettertoUppercase } from '../../utils/helpers';

// store
import { IStore } from '../../types/store';

// styles
import styles from './FooterTags.module.scss';

export const FooterTags = (): React.JSX.Element => {
  const tags = useSelector((state: IStore) => state.tags.tags);
  console.log('🚀 ~ file: FooterTags.tsx:5 ~ FooterTags ~ tags:', tags);

  return (
    <>
      <h4>Product tags</h4>
      <div className={styles['tags']}>
        {tags.map((tag) => (
          <Link
            to={`/tag/${tag.id}`}
            key={tag.id}
            className={styles['tags-tag']}
          >
            {firstLettertoUppercase(tag.name)}
          </Link>
        ))}
      </div>
    </>
  );
};
