// libraries
import { Link } from 'react-router-dom';

// types
import { IFooterLink } from '../../types';

// styles
import styles from './FooterColumn.module.scss';

interface IFooterColumn {
  column: IFooterLink;
}

export const FooterColumn = ({ column }: IFooterColumn): React.JSX.Element => {
  return (
    <>
      <div className={styles['column']}>
        <h4>{column.title}</h4>
        {column.links.map((link) => (
          <Link to={link.link} key={link.text} className={styles['link']}>
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};
