import { useNavigate } from "react-router-dom"
import usePijamaStore from "../../../stores/usePijamaStore"
import Pijama from "../../../types/Pijama"
import styles from "./styles.module.css"


interface CartItem{
    pijama: Pijama;
    size: string;
    quantity: number;
    stock: number;
}

interface AddToCartButtonProps {
    pijama: Pijama;
    size: string;
    quantity: number;
    stock: number;
    disabled: boolean
}

export default function AddToCartButton ({ pijama, size, quantity, stock, disabled }: AddToCartButtonProps) {
    const { addToCart} = usePijamaStore()
    const navigate = useNavigate()

    function handleClick() {
        const cartItem: CartItem = { pijama, quantity, size, stock }

        if (!disabled) { // Verifica se o botão não está desabilitado antes de adicionar ao carrinho
            addToCart(cartItem);
            navigate("/carrinho");
        }
    }

    return (
        <button className={styles.button} onClick={handleClick}>
            ADICIONAR AO CARRINHO
        </button>
    )
}