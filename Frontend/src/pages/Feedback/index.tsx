import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

// Importando imagens das estrelas
import starFilled from "/src/assets/star-filled.png";
import starHalf from "/src/assets/star-half.png";
import starEmpty from "/src/assets/star-empty.png";

export default function Feedback() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Envio do feedback para o backend
  const onSubmit = async (data: any) => {
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação com estrelas.");
      return;
    }

    const feedbackData = { ...data, rating };

    try {
      const response = await fetch("http://localhost:3000/feedbacks", { // <-- CONFIRA SE A URL ESTÁ CORRETA
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setModalOpen(true);
      } else {
        alert("Erro ao enviar feedback.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar feedback.");
    }
  };

  // Atualiza a avaliação com suporte a meia estrela
  const handleStarClick = (index: number) => {
    if (rating === index + 1) {
      setRating(index + 0.5); // Se já estiver cheia, define meia estrela
    } else {
      setRating(index + 1); // Caso contrário, preenche completamente
    }
  };

  return (
    <main>
      <section className={styles.corpo}>
        <div className={styles.container}>
          <h1 className={styles.title}>Feedbacks</h1>
          <p className={styles.text}>
            Fale um pouco sobre a sua <br /> experiência com a nossa loja!
          </p>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className={styles.input}
              placeholder="Nome completo"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome?.message && <span className={styles.error}>{errors.nome.message}</span>}

            <textarea
              className={styles.descricao}
              placeholder="Descrição detalhada"
              {...register("descricao", { required: "Descrição é obrigatória" })}
            />
            {errors.descricao?.message && <span className={styles.error}>{errors.descricao.message}</span>}

            {/* Seção de Estrelas */}
            <div className={styles.starSection}>
              <div className={styles.starContainer}>
                {Array.from({ length: 5 }, (_, index) => {
                  const filled = index + 1 <= rating;
                  const halfFilled = rating === index + 0.5;

                  return (
                    <img
                      key={index}
                      src={filled ? starFilled : halfFilled ? starHalf : starEmpty}
                      alt={`Star ${index + 1}`}
                      className={styles.star}
                      onClick={() => handleStarClick(index)}
                      onMouseEnter={() => setHover(index + 1)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.botao1}>
              <button type="submit" className={styles.button}>ENVIAR</button>
            </div>
          </form>
        </div>
      </section>

      {/* Modal de Confirmação */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Feedback enviado!</h2>
            <p>Obrigado por compartilhar sua opinião.</p>
            <button onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </main>
  );
}
