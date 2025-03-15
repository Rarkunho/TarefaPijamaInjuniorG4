import { useNavigate } from "react-router-dom"
import usePijamaStore from "../../../stores/usePijamaStore"
import Pijama from "../../../types/Pijama"
import styles from "./styles.module.css"

interface AddToCartProps {
    pijamaSelecionado: Pijama
    quantidade: number
}

interface CartItem{
    pijama: Pijama;
    quantity: number;
}

export default function AddToCartButton (props: AddToCartProps) {
    const { addToCart} = usePijamaStore()
    const navigate = useNavigate()

    function handleClick() {
        const cartItem: CartItem = {
            pijama: props.pijamaSelecionado, 
            quantity: props.quantidade        
        }
        addToCart(cartItem)
        navigate("/carrinho")
    }

    return (
        <button className={styles.button} onClick={handleClick}>
            ADICIONAR AO CARRINHO
        </button>
    )
}