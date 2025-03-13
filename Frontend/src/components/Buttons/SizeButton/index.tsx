import styles from "./styles.module.css"

interface ButtonProps {
    text: string
    isActive: boolean
    onClick: () => void
}

export default function SizeButton (props: ButtonProps) {
    const buttonText = props.text

    return (
        <button 
            className={props.isActive ? styles.buttonActive : styles.button}
            onClick={props.onClick}
        >
            {buttonText}
        </button>
    )
}