import SizeButton from "../../components/Buttons/SizeButton";
import closeButton from "../../assets/X.png";

import QuantityButton from "../../components/Buttons/QuantityButton";
import styles from "./styles.module.css";
import { SetStateAction, useState } from "react";

interface CartItemProps {
    id: string;
    image: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    stock: number;
    removeFromCart: (index: string) => void;
    className?: string;
}

function CartItem(props: CartItemProps) {
    const [qtdCounter, setQtdCounter] = useState(1);

    const handleCounterChange = (newCounterValue: SetStateAction<number>) => {
        setQtdCounter(newCounterValue)
    }


    return (
        <div className={styles.cart__item}>
            <div style={{ display: "flex", gap: "2.7rem" }}>
                <img
                    className={styles.cart__item__img}
                    src={props.image}
                    alt="Foto do Pijama"
                />
                <div className={styles.cart__item__infosize}>
                    <div className={styles.cart__item__title}>
                        <h2>{props.name}</h2>
                        <p className={styles.cart__item__ref}>
                            Ref:{`#${props.id}`}
                        </p>
                    </div>
                    <SizeButton
                        text={props.size}
                        isActive={true}
                        onClick={() => {}}
                    />
                </div>
            </div>

            <div className={styles.cart__item__qtdprice}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img
                        className={`${styles.closeButton}`}
                        src={closeButton}
                        alt="icone de fechar"
                        onClick={() => {
                            props.removeFromCart(props.id);
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "flex-end",
                        gap: "2.7rem",
                    }}>
                    <div className={styles.quantidade}>
                        <h2 className={styles.tituloItalico}>Quantidade: </h2>
                        <QuantityButton onCounterChange={handleCounterChange} numberSizes={0} />
                    </div>
                    <h2 className={styles.cart__item__price}>R${(props.price * qtdCounter).toFixed(2).replace(".", ",")}</h2>
                </div>
                <p className={styles.cart__item__msg}>
                    Ainda temos <span>{props.stock}</span> peças do tamanho
                    escolhido <br />
                    em nosso estoque!
                </p>
            </div>
        </div>
    );
}

export default CartItem;
