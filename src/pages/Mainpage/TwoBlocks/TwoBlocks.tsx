// components
import { BannerBlock } from '../BannerBlock/BannerBlock';
import { SidebarInBlock } from '../SidebarInBlock/SidebarInBlock';

// types
import { ICategory } from '../../../types/store';

// styles
import styles from './TwoBlocks.module.scss';

interface TwoBlocksProps {
  categoryData: ICategory[];
}

export const TwoBlocks: React.FC<TwoBlocksProps> = ({ categoryData }) => {
  if (!categoryData) return null;
  console.log('🚀 ~ file: TwoBlocks.tsx:17 ~ categoryData:', categoryData);

  return (
    <>
      <div className={styles['two-blocks']}>
        {categoryData.length ? (
          <SidebarInBlock
            data={categoryData}
            title="Category menu"
            button={{ text: 'More categories', icon: 'icon-chevron-right' }}
          />
        ) : null}
        <BannerBlock
          button={{ text: 'Read recepies', icon: 'icon-chevron-right' }}
        ></BannerBlock>
        <BannerBlock
          button={{ text: 'Read recepies', icon: 'icon-chevron-right' }}
        ></BannerBlock>
      </div>
    </>
  );
};
