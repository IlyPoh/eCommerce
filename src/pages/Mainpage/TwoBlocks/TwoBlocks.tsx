// IMPORTS
// components
import { BannerBlock } from '../BannerBlock/BannerBlock';
import { SidebarLinks } from '../../../components/SidebarLinks/SidebarLinks';

// types
import { ICategory } from '../../../types/store';
import { IBannerProps, ILinkProps } from '../../../types';

// styles
import styles from './TwoBlocks.module.scss';

// TYPES
interface TwoBlocksProps {
  categoryData: ICategory[];
  sidebarTitle?: string;
  sidebarLink?: ILinkProps;
  firstBlockInfo?: IBannerProps;
  firstBlockLink?: ILinkProps;
  secondBlockInfo?: IBannerProps;
  secondBlockLink?: ILinkProps;
}

// COMPONENT
export const TwoBlocks: React.FC<TwoBlocksProps> = ({
  categoryData,
  sidebarTitle,
  sidebarLink,
  firstBlockInfo,
  firstBlockLink,
  secondBlockInfo,
  secondBlockLink,
}) => {
  if (!categoryData) return null;

  return (
    <div className={styles['two-blocks']}>
      {categoryData.length ? (
        <SidebarLinks
          data={categoryData}
          title={sidebarTitle ?? 'Category menu'}
          link={{
            text: sidebarLink?.text ?? 'More categories',
            icon: sidebarLink?.icon ?? 'icon-chevron-right',
            link: sidebarLink?.link ?? '/products',
          }}
        />
      ) : null}
      <BannerBlock
        title={firstBlockInfo?.title}
        subtitle={firstBlockInfo?.subtitle}
        link={{
          text: firstBlockLink?.text ?? 'Read recepies',
          icon: firstBlockLink?.icon ?? 'icon-chevron-right',
          link: firstBlockLink?.link ?? '/',
        }}
      ></BannerBlock>
      <BannerBlock
        title={secondBlockInfo?.title}
        subtitle={secondBlockInfo?.subtitle}
        link={{
          text: secondBlockLink?.text ?? 'Read recepies',
          icon: secondBlockLink?.icon ?? 'icon-chevron-right',
          link: secondBlockLink?.link ?? '/',
        }}
      ></BannerBlock>
    </div>
  );
};
