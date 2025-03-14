import styles from "./styles.module.css";
import starFilled from "/src/assets/star-filled.png";
import starHalf from "/src/assets/star-half.png";
import starEmpty from "/src/assets/star-empty.png";

interface FeedbackProps {
  name: string;
  rating: number;
  text: string;
}

export default function FeedbackCard({ name, rating, text }: FeedbackProps) {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index + 1 <= rating;
          const halfFilled = rating > index && rating < index + 1;

          return (
            <img
              key={index}
              src={filled ? starFilled : halfFilled ? starHalf : starEmpty}
              alt={`Star ${index + 1}`}
              className={styles.star}
            />
          );
        })}
      </div>
      <p>{text}</p>
    </div>
  );
}
