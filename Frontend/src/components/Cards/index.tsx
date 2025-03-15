import styles from "./styles.module.css"
import botaoCoracaoAtivo from "../../assets/FavoritoActive.png"
import botaoCoracaoInativo from "../../assets/FavoritoInactive.png"
import iconeDesconto from "../../assets/iconeDesconto.png"
import { useNavigate } from "react-router-dom"
import usePijamaStore from "../../stores/usePijamaStore"
import Pijama from "../../types/Pijama"
import { useEffect, useState } from "react"
import formatarPreco from "../../hooks/usePrice"

interface CardsProps {
    className?: string
    pijama: Pijama
}

export default function Cards({ pijama, ...props }: CardsProps) {
    const navigate = useNavigate()
    const [preco, setPreco] = useState<number>(pijama.price)
    const [liked, setLiked] = useState<boolean>(pijama.favorite)
    const {addToFavorite} = usePijamaStore();

    function handleClick() {
        addToFavorite(pijama.id)
        console.log(pijama.id)
        navigate("/favoritos")
    }


    useEffect(() => {
        if (pijama.salePercent && pijama.salePercent > 0) {
            const novoPreco = pijama.price - (pijama.price * (pijama.salePercent / 100));
            setPreco(novoPreco); 
        }
    }, [pijama.price, pijama.salePercent])

    return (
        <>
            <li 
                {...props} 
                key={pijama.id}
                className={`${styles.container} ${props.className}`}
            >
                <div className={styles.layout}>
                    <img src={pijama.image} alt="Foto do Pijama"/>
                    <button onClick={liked ? undefined : handleClick}>
                        <img 
                            src={liked ? botaoCoracaoAtivo : botaoCoracaoInativo} 
                            alt="Botão de Curtir" 
                        />
                    </button>
                    {(pijama.salePercent ?? 0) > 0 && (
                        <img 
                            className={styles.discountIcon}
                            src={iconeDesconto} 
                            alt="Ícone de Desconto" 
                            style={{ width: "83px", height: "83px", position: "absolute", top: "0", right: "0" }}
                        />
                    )}
                </div>
                <div  
                    className={`${styles.info} 
                    ${pijama.salePercent !== undefined && pijama.salePercent > 0 ? styles.precoComDesconto : styles.precoSemDesconto}`}
                    onClick={() => navigate(`/pijama/${pijama.id}`)}
                >
                    <h2>{pijama.name}</h2>
                    <div className={styles.preco}>
                        <div>
                             {pijama.salePercent !== undefined && pijama.salePercent > 0 ? (
                                 <span className={styles.desconto}>
                                     {formatarPreco(pijama.price)}
                                 </span>
                             ) : null}
                             <h3>{formatarPreco(preco)}</h3>
                         </div>
                         <p>6x de <span>{formatarPreco(preco / 6)}</span></p>
                    </div>
                </div>
            </li>
        </>
    )
}



