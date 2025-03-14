import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import FeedbackCard from "../Feedback Cards";

const feedbacks = [
  { name: "Fulano da Silva", rating: 4.5, text: "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam." },
  { name: "Beltrano Souza", rating: 4, text: "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam." },
  { name: "Ciclano Mendes", rating: 5, text: "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam." },
  { name: "Ana Pereira", rating: 3.5, text: "Lorem ipsum dolor sit amet. Et voluptatem officia ad sint voluptate qui  voluptas sunt non fugiat labore et consequatur voluptatem sed optio  veniam aut perferendis delectus! Aut Quis impedit a quas animi 33 alias  provident et ipsum deleniti eos pariatur quibusdam." }
];

export default function FeedbackCarrossel() {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3} // Exibe 3 cards por vez
        navigation
        pagination={{ clickable: true }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <FeedbackCard {...feedback} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
