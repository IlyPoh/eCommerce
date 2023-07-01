// styles
import styles from './ErrorBox.module.scss';

interface IErrorProps {
  error: string;
}

export const ErrorBox: React.FC<IErrorProps> = ({ error }) => {
  return (
    <div className={styles['error']}>
      <span className={styles['error-message']}>Error:</span>
      {error}
    </div>
  );
};
