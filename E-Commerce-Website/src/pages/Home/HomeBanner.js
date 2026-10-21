import React from 'react';
// Import Swiper React components and required styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomeBanner = () => {
  // Banner slides data
  const banners = [
    {
      id: 1,
      image: '/image/banner1.jpg',
      title: 'Fresh Organic Products',
      subtitle: 'Get up to 30% off on your first order',
    },
    {
      id: 2,
      image: '/image/banner2.jpg',
      title: 'Everyday Fresh & Clean',
      subtitle: 'Quality groceries delivered right to your doorstep',
    },
    {
      id: 3,
      image: '/image/banner3.jpg',
      title: 'Best Prices & Offers',
      subtitle: 'Save big with weekly deals and discounts',
    }
  ];

  return (
    <div className="homeBannerSection mb-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="homeBannerSwiper rounded-3 overflow-hidden shadow-sm"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="bannerItem position-relative d-flex align-items-center"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '380px',
              }}
            >
              <div className="bannerContent p-4 p-md-5 text-white bg-dark bg-opacity-25 w-100 h-100 d-flex flex-column justify-content-center">
                <span className="badge bg-success mb-2 align-self-start fs-6 px-3 py-2">
                  Special Offer
                </span>
                <h1 className="fw-bold display-5 text-white mb-2">{item.title}</h1>
                <p className="fs-5 text-light mb-4">{item.subtitle}</p>
                <div>
                  <button className="btn btn-primary btn-lg rounded-pill px-4">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;