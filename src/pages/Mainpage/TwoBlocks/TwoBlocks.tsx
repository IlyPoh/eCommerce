// IMPORTS
// components
import { BannerBlock } from '../BannerBlock/BannerBlock';
import { SidebarInBlock } from '../SidebarInBlock/SidebarInBlock';

// types
import { ICategory } from '../../../types/store';

// styles
import styles from './TwoBlocks.module.scss';

// TYPES
interface TwoBlocksProps {
  categoryData: ICategory[];
}

// COMPONENT
export const TwoBlocks: React.FC<TwoBlocksProps> = ({ categoryData }) => {
  if (!categoryData) return null;

  return (
    <>
      <div className={styles['two-blocks']}>
        {categoryData.length ? (
          <SidebarInBlock
            data={categoryData}
            title="Category menu"
            link={{ text: 'More categories', icon: 'icon-chevron-right' }}
          />
        ) : null}
        <BannerBlock
          link={{ text: 'Read recepies', icon: 'icon-chevron-right' }}
        ></BannerBlock>
        <BannerBlock
          link={{ text: 'Read recepies', icon: 'icon-chevron-right' }}
        ></BannerBlock>
      </div>
    </>
  );
};
