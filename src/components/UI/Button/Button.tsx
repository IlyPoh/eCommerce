// IMPORTS
// libraries
import classNames from 'classnames';

// types
import { ButtonProps } from '../../../types';

// style
import styles from './Button.module.scss';

//  COMPONENT
export const Button: React.FC<ButtonProps> = ({
  text,
  classes = '',
  icon,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classList = classes.split(' ');

  const buttonClasses = classNames(
    ...classList.map((classItem) =>
      styles[classItem] ? styles[classItem] : classItem
    )
  );

  return (
    <button className={`${buttonClasses} ${className}`} {...props}>
      {text ?? children}
      {icon && <i className={icon}></i>}
    </button>
  );
};
