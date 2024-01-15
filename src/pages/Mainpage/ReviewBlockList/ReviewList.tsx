// IMPORTS
// libraries
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// components
import { ReviewItem } from '../ReviewItem/ReviewItem';
import { BlockHeadline } from '@/components/BlockHeadline/BlockHeadline';

// types
import { ILinkProps } from '@/types';
import { IReview } from '@/types/store';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import styles from './ReviewList.module.scss';

// TYPES
interface IReviewListProps {
  data: IReview[];
  title?: string;
  link?: ILinkProps;
}

// COMPONENT
export const ReviewList: React.FC<IReviewListProps> = ({
  data,
  title,
  link,
}) => {
  const renderSlides = () => {
    return (
      <div className={styles['list']}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          scrollbar={{ draggable: true }}
          initialSlide={1}
          navigation
          slideToClickedSlide
          slidesPerView={'auto'}
        >
          <div className="swipper-container">
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <ReviewItem data={item} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <BlockHeadline title={title} link={link} />
      </div>

      {data.length ? renderSlides() : null}
    </>
  );
};
