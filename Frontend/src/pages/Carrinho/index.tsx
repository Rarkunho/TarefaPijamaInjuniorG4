import styles from "./styles.module.css";
import logoCarrinho from "../../assets/ComprasActive.png";
import logoFavoritos from "../../assets/FavoritoInactive.png";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../components/Buttons/GenericButton";
import usePijamaStore from "../../stores/usePijamaStore";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import Modal from "../../components/Modal";

export default function Carrinho() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, getCart } = usePijamaStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.pijama.id}
                            id={item.pijama.id}
                            image={item.pijama.image}
                            name={item.pijama.name}
                            price={item.pijama.price * item.quantity}
                            size={item.size}
                            quantity={item.quantity}
                            stock={item.stock}
                            removeFromCart={() => removeFromCart(item.pijama.id)}
                        />
                    ))}

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
                            {`R$${cartItems.reduce(
                                (total, item) =>
                                    total + item.pijama.price * item.quantity,
                                0,
                            ).toFixed(2)}`}
                        </span>{" "}
                    </h2>
                    <GenericButton
                        text={"COMPRE TUDO"}
                        onClick={handleOpenModal}
                    />

                    {isModalOpen && (
                        <>
                            <div
                                className={styles.overlay}
                                onClick={handleCloseModal}></div>
                            <Modal
                                modalType="endereco"
                            />
                        </>
                    )}
                    {/* <Modal modalType="endereco" />
                    <Modal modalType="pagamento" />
                    <Modal modalType="concluido" /> */}
                </div>
            </main>
        </>
    );
}
