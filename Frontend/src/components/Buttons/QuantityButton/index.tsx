import styles from "./styles.module.css"
import somar from "../../../assets/Plus Math.png"
import subtrair from "../../../assets/Subtract.png"
import useCounter from "../../../hooks/UseCounter"

export default function QuantityButton() {
    const initialCondition = 1
    const {counter, increment, decrement} = useCounter(initialCondition)

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