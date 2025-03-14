import styles from "./styles.module.css"
import botaoCoracao from "../../assets/Favorito2.png"
import { useNavigate } from "react-router-dom"
import usePijamaStore from "../../stores/usePijamaStore"
import Pijama from "../../types/Pijama"

interface CardsProps {
    className?: string
}

export default function Cards({ pijama }: { pijama: Pijama }) {
    //const pijamas = usePijamaStore((state) => state.pijamas)
    const navigate = useNavigate()

    return (
        <>
            <li 
                //{...props} 
                key={pijama.key}
                //className={`${styles.container} ${props.className}`}
                onClick={() => navigate(`/pijama/${pijama.key}`)}
            >
                <div className={styles.layout}>
                    <img src={pijama.image} alt="Foto do Pijama"/>
                    <button 
                        //className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
                        //onClick={handleLike}
                    >
                        <img src={botaoCoracao} alt="Botão de Pesquisa"/>
                    </button>
                </div>
                <div className={styles.info}>
                    <span className={styles.desconto}>
                        {pijama.sale_percent !== null ? `R$ ${pijama.sale_percent}% de desconto` : null}
                    </span>
                    <h2>{pijama.name}</h2>
                    <div className={styles.preco}>
                        <h3>{pijama.price}</h3>
                        <p>6x de <span>{pijama.price}</span></p>
                    </div>
                </div>
            </li>
        </>
    )
}



