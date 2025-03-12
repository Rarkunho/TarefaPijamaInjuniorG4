import styles from "./styles.module.css"
import fotoTeste from "../../assets/pijamaTeste.png"
import botaoCoracao from "../../assets/Favorito2.png"

interface CardsProps {
    className?: string
}

export default function Cards(props: CardsProps) {
    return (
        <>
            <li {...props} className={`${styles.container} ${props.className}`}>
                <div className={styles.layout}>
                    <img src={fotoTeste} alt="Botão de Pesquisa"/>
                    <button 
                        //className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
                        //onClick={handleLike}
                    >
                        <img src={botaoCoracao} alt="Botão de Pesquisa"/>
                    </button>
                </div>
                <div className={styles.info}>
                    <span className={styles.desconto}>R$ 00,00</span>
                    <h2>Pijama feminino longo - estampa poá</h2>
                    <div className={styles.preco}>
                        <h3>R$ 00,00</h3>
                        <p>6x de <span>R$ 00,00</span></p>
                    </div>
                </div>
            </li>
        </>
    )
}



