import Cards from "../../components/Cards";
import styles from "./styles.module.css";
import logoCarrinho from "../../assets/ComprasInactive.png";
import logoFavoritos from "../../assets/FavoritoActive.png";
import BotaoEsq from "../../assets/botaoesq.png";
import BotaoDir from "../../assets/botaodir.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import usePijamaStore from "../../stores/usePijamaStore";

export default function Favoritos() {
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const btnEsqRef = useRef<HTMLImageElement | null>(null);
    const btnDirRef = useRef<HTMLImageElement | null>(null);

    const { pijamas, filterByFavorite } = usePijamaStore(); 

    useEffect(() => {
            filterByFavorite(); // dispara a atualização
        }, [ filterByFavorite]);
    
    useEffect(() => {
        console.log(pijamas, "carregado"); // só roda quando 'pijamas' mudar
    }, [pijamas]);

    const arrayCards = [];
    const movement = 500

    for (let index = 0; index < pijamas.length; index++) {
        arrayCards.push(<Cards key={index} pijama={pijamas[index]} />);
    }

    const scrollLeft = () => {
        console.log(containerRef.current?.scrollWidth , 'width');
        console.log(containerRef.current?.clientWidth, 'client');
        console.log(containerRef.current?.scrollLeft,  'scroll');
        console.log(Number(containerRef.current?.scrollWidth) - Number(containerRef.current?.clientWidth))
        if(btnDirRef.current){
            btnDirRef.current.classList.remove(styles.btnInactive)
        }

        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -movement, behavior: 'smooth' });
            if (containerRef.current.scrollLeft < Number(containerRef.current.clientWidth) / arrayCards.length){
                btnEsqRef.current?.classList.add(styles.btnInactive);
            }
        }
    };

    const scrollRight = () => {
        console.log(containerRef.current?.scrollWidth , 'width');
        console.log(containerRef.current?.clientWidth, 'client');
        console.log(containerRef.current?.scrollLeft,  'scroll');

        if(btnEsqRef.current){
            btnEsqRef.current.classList.remove(styles.btnInactive)
        }

        if (containerRef.current) {
            containerRef.current.scrollBy({ left: movement, behavior: 'smooth' });
            console.log(containerRef.current.scrollLeft);
            if (containerRef.current.scrollLeft >= Number(containerRef.current.scrollWidth) - Number(containerRef.current.clientWidth)){
                btnDirRef.current?.classList.add(styles.btnInactive);
            }
        }
    };

    return (
        <>
            <nav className={styles.nav}>
                <img
                    className={styles.carrinho}
                    src={logoCarrinho}
                    alt="Ícone de Carrinhos"
                    onClick={() => navigate("/carrinho")}
                />
                <h2 className={`${styles.title} ${styles.inactive}`} onClick={() => navigate("/carrinho")}>
                    Carrinho
                </h2>
                <img
                    className={`${styles.title} ${styles.inactive}`}
                    src={logoFavoritos}
                    alt="Ícone de Favoritos"
                    onClick={() => navigate("/favoritos")}
                />
                <h2 className={styles.title}  onClick={() => navigate("/favoritos")}>Favoritos</h2>
            </nav>
            <div className={`${styles.favcards__carrosel} ${styles.fundo}`}>
                <img
                    ref={btnEsqRef}
                    className={`${styles.botao} ${styles.btnInactive}`}
                    src={BotaoEsq}
                    alt="Botão de rolagem esquerda"
                    onClick={scrollLeft}
                />
                <div ref={containerRef} className={styles.favcards__container}>
                    {arrayCards.map((card) => card)}
                </div>
                <img
                    ref={btnDirRef}
                    className={styles.botao}
                    src={BotaoDir}
                    alt="Botão de rolagem direita"
                    onClick={scrollRight}
                />
            </div>
        </>
    );
}