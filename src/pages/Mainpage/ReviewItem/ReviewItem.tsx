// types
import { IReview } from '@customTypes/store';

// styles
import styles from './ReviewItem.module.scss';

interface IReviewItemProps {
  data: IReview;
}

export const ReviewItem: React.FC<IReviewItemProps> = ({ data }) => {
  return (
    <div className={styles['item']}>
      <div className={styles['body']}>
        <div className={styles['text']}>“ {data?.review} “</div>
        <div className={styles['name']}>{data?.name}</div>
      </div>
      {data?.image && (
        <div className={styles['image']}>
          <img src={data?.image} alt={data.name} />
        </div>
      )}
    </div>
  );
};
