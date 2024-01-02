// IMPORTS
// libraries
import { FC } from 'react';

// types
import { ICheckboxType } from '@customTypes/index';

// styles
import styles from './CheckboxButton.module.scss';

// TYPES
interface ICheckboxButtonProps
  extends React.LabelHTMLAttributes<HTMLInputElement> {
  value: string;
  checked: boolean;
  type: ICheckboxType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

// COMPONENT
export const CheckboxButton: FC<ICheckboxButtonProps> = ({
  value,
  checked,
  type,
  onChange,
  label,
  children,
}) => {
  return (
    <label className={styles['label']}>
      <input
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles['input']}
      />
      <div
        className={`${styles['text']} ${styles[type]} ${
          type === ICheckboxType.CHECKBOX ? 'icon-actions-check-simple' : null
        }`}
      >
        {children ?? <span>{label}</span>}
      </div>
    </label>
  );
};
