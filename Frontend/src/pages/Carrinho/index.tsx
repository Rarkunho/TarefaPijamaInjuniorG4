import styles from "./styles.module.css";
import logoCarrinho from "../../assets/ComprasActive.png";
import logoFavoritos from "../../assets/FavoritoInactive.png";
import { useNavigate } from "react-router-dom";
import fotoTeste from "../../assets/pijamaTeste.png";
import GenericButton from "../../components/Buttons/GenericButton";
import usePijamaStore from "../../stores/usePijamaStore";
import { useEffect } from "react";
import CartItem from "../../components/CartItem";

export default function Carrinho() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, getCart } = usePijamaStore();

    useEffect(() => {
        getCart();
    }, [getCart]);

    return (
        <>
            <nav className={styles.nav}>
                <img
                    className={`${styles.title}`}
                    src={logoCarrinho}
                    alt="Ícone de Carrinhos"
                    onClick={() => navigate("/carrinho")}
                />
                <h2
                    className={`${styles.title}`}
                    onClick={() => navigate("/carrinho")}>
                    Carrinho
                </h2>
                <img
                    className={`${styles.title} ${styles.inactive}`}
                    src={logoFavoritos}
                    alt="Ícone de Favoritos"
                    onClick={() => navigate("/favoritos")}
                />
                <h2
                    className={`${styles.title} ${styles.inactive}`}
                    onClick={() => navigate("/favoritos")}>
                    Favoritos
                </h2>
            </nav>
            <main className={`${styles.fundo} ${styles.main}`}>
                <div className={styles.cart__container}>
                    <CartItem
                        id={0}
                        image={fotoTeste}
                        name={"PIJAMA FEMININO LONGO - ESTAMPA POÁ"}
                        price={78.9}
                        size={"M"}
                        quantity={0}
                        stock={30}
                        removeFromCart={(): void => {
                            removeFromCart(-8789789789789789);
                        }}
                    />

                    {cartItems.length === 0 && (
                        <h2
                            className={`${styles.title}`}
                            style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                marginBottom: "2rem",
                            }}>
                            Carrinho Vazio
                        </h2>
                    )}
                </div>
                <div className={styles.cart__total}>
                    <h2>
                        TOTAL{" "}
                        <span className={styles.cart__total__price}>
                            R$ 78,90
                        </span>{" "}
                    </h2>
                    <GenericButton
                        text={"COMPRE TUDO"}
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                </div>
            </main>
        </>
    );
}
