import styles from "./styles.module.css"
import somar from "../../../assets/Plus Math.png"
import subtrair from "../../../assets/Subtract.png"

export default function QuantityButton() {
    return (
        <>
            <div className={styles.container}>
                <button className={styles.button}>
                    <img src={subtrair} alt="Botao para diminuir a quantidade"/> 
                </button>
                <span>1</span>
                <button className={styles.button}>
                    <img src={somar} alt="Botao para aumentar a quantidade"/>   
                </button> 
            </div>
        </>
    )
}