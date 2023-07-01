// style
import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
  return (
    <div className={styles['loading']}>
      <div className={styles['lds-roller']}>
        {Array.from(Array(8).keys()).map((item) => (
          <div key={item}></div>
        ))}
      </div>
    </div>
  );
};
