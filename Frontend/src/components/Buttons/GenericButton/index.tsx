import styles from "./styles.module.css"

interface ButtonProps {
    text: string
    onClick: () => void
    className?: string
}


export default function GenericButton (props: ButtonProps) {
    return (
        <button onClick={props.onClick} className={`${styles.button} ${props.className}`}>
            {props.text}
        </button>
    )
}