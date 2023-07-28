// IMPORTS
// styles
import styles from './ErrorBox.module.scss';

// TYPES
interface IErrorProps {
  error: string;
}

// COMPONENT
export const ErrorBox: React.FC<IErrorProps> = ({ error }) => {
  return (
    <div className={styles['error']}>
      <span className={styles['error-message']}>Error:</span>
      {error}
    </div>
  );
};
