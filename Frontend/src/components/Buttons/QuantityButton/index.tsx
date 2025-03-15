import styles from "./styles.module.css"
import somar from "../../../assets/Plus Math.png"
import subtrair from "../../../assets/Subtract.png"
import useCounter from "../../../hooks/useCounter"
import { useEffect, useState } from "react";

interface QuantityButtonProps {
    onCounterChange?: (value: number) => void
    numberSizes: number
}

export default function QuantityButton({ onCounterChange, numberSizes }: QuantityButtonProps) {
    const [finalCondition, setFinalCondition] = useState<number>(1)
    const initialCondition = 1

    useEffect(() => {
        setFinalCondition(numberSizes);
        setCounter(initialCondition)
    }, [numberSizes]);

    const {counter, increment, decrement, setCounter} = useCounter(initialCondition, finalCondition)

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