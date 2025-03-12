import styles from "./styles.module.css"

export default function SizeButton () {
    const buttonText = "P"

    return (
        <button className={styles.button}>
            {buttonText}
        </button>
    )
}