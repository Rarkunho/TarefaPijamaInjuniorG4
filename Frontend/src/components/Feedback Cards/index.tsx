import styles from "./styles.module.css";

// Ícones de estrelas
import starFilled from "/src/assets/star-filledV.png";
import starHalf from "/src/assets/star-halfV.png";
import starEmpty from "/src/assets/star-emptyV.png";

interface FeedbackCardProps {
  name: string;
  rating: number;
  text: string;
}

export default function FeedbackCard({ name, rating, text }: FeedbackCardProps) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      {/* Exibir as estrelas */}
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => {
          const full = index + 1 <= rating;
          const half = rating > index && rating < index + 1;
          return (
            <img
              key={index}
              src={full ? starFilled : half ? starHalf : starEmpty}
              alt="Star"
              className={styles.star}
            />
          );
        })}
      </div>
      <div className={styles.text}>
      <p>{text}</p>
      </div>
    </div>
  );
}
