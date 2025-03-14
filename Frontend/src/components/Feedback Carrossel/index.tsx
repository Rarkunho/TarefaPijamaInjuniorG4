import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import styles from "./styles.module.css";
import FeedbackCard from "../Feedback Cards/index";


const feedbacks = [
  { name: "Fulano da Silva", rating: 4.5, text: "Ótima experiência, recomendo!" },
  { name: "Beltrano Souza", rating: 4, text: "Muito bom, mas pode melhorar." },
  { name: "Ciclano Mendes", rating: 5, text: "Excelente! Atendimento nota 10." },
  { name: "Ana Pereira", rating: 3.5, text: "Bom, mas esperava mais." },
  { name: "José Ricardo", rating: 5, text: "Tudo perfeito, comprarei novamente!" }
];

export default function FeedbackCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <h1 className={styles.title}>Feedbacks</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4} // Exibir 4 por vez
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
