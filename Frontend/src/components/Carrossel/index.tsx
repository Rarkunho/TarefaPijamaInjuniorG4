import { useState } from "react";
import styles from "./styles.module.css"; 

// Lista de imagens do carrossel
const imagens = [
  "/src/assets/carrossel1.png",
  "/src/assets/carrossel2.png",
  "/src/assets/carrossel3.png",
];

export default function Carrossel() {
  const [index, setIndex] = useState(0);

  // Função para avançar no carrossel
  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  };

  // Função para voltar no carrossel
  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  return (
    <div className={styles.carrossel}>
      <button className={styles.seta} onClick={prevImage}>
        <img src="/src/assets/setavoltar.png" alt="Voltar" />
      </button>
      <img src={imagens[index]} alt="Imagem do Carrossel" className={styles.imagem} />
      <button className={styles.seta} onClick={nextImage}>
        <img src="/src/assets/setaprox.png" alt="Próximo" />
      </button>
    </div>
  );
}
