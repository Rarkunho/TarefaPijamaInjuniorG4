import styles from "./styles.module.css"
import somar from "../../../assets/Plus Math.png"
import subtrair from "../../../assets/Subtract.png"
import useCounter from "../../../hooks/useCounter"

interface QuantityButtonProps {
    onCounterChange?: (value: number) => void;
}

export default function QuantityButton({ onCounterChange }: QuantityButtonProps) {
    const initialCondition = 1
    const {counter, increment, decrement} = useCounter(initialCondition)

    if (onCounterChange) onCounterChange(counter)

    return (
        <>
            <div className={styles.container}>
                <button 
                    className={styles.button}
                    onClick={decrement}
                >
                    <img src={subtrair} alt="Botao para diminuir a quantidade"/> 
                </button>
                <span>{counter}</span>
                <button 
                    className={styles.button}
                    onClick={increment}
                >
                    <img src={somar} alt="Botao para aumentar a quantidade"/>   
                </button> 
            </div>
        </>
    )
}