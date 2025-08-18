import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function AppCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {["Card 1", "Card 2", "Card 3", "Card 4"].map((t, i) => (
        <SwiperSlide key={i}>
          <div className="card">{t}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}