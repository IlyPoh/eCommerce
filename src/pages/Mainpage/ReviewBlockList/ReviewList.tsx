// libraries
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// components
import { ReviewItem } from '../ReviewItem/ReviewItem';
import { BlockHeadline } from '../../../components/BlockHeadline/BlockHeadline';

// types
import { IReview } from '../../../types/store';
import { ILinkProps } from '../../../types';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import styles from './ReviewList.module.scss';

interface IReviewListProps {
  data: IReview[];
  title?: string;
  link?: ILinkProps;
}

export const ReviewList: React.FC<IReviewListProps> = ({
  data,
  title,
  link,
}) => {
  return (
    <>
      <div className={styles['block']}>
        <div className="container">
          <BlockHeadline title={title} link={link} />
        </div>

        {data.length ? (
          <div className={styles['list']}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={32}
              scrollbar={{ draggable: true }}
              initialSlide={1}
              navigation
              loop
              centeredSlides
              slideToClickedSlide
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
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
        ) : null}
      </div>
    </>
  );
};
