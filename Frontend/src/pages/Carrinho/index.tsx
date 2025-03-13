import styles from "./styles.module.css";
import logoCarrinho from "../../assets/ComprasActive.png";
import logoFavoritos from "../../assets/FavoritoInactive.png";
import { useNavigate } from "react-router-dom";


export default function Carrinho() {
    const navigate = useNavigate();
    
    return (
        <>
            <nav className={styles.nav}>
                <img
                    className={`${styles.title}`}
                    src={logoCarrinho}
                    alt="Ícone de Carrinhos"
                    onClick={() => navigate("/carrinho")}
                />
                <h2 className={`${styles.title}`} onClick={() => navigate("/carrinho")}>
                    Carrinho
                </h2>
                <img
                    className={`${styles.title} ${styles.inactive}`}
                    src={logoFavoritos}
                    alt="Ícone de Favoritos"
                    onClick={() => navigate("/favoritos")}
                />
                <h2 className={`${styles.title} ${styles.inactive}`}  onClick={() => navigate("/favoritos")}>Favoritos</h2>
            </nav>
            <main className={`${styles.fundo}`}>
                <h3>a</h3>
            </main>
        </>
    );
}