import styles from './styles.module.scss';

interface DivisorProps {
    text?: string
}

export function Divisor({ text }: DivisorProps) {

    return (
        <div className={styles.divisor_wraper}>
            {
                text && (
                    <span className={styles.divisor_text}>{text}</span>
                )
            }
            <div className={styles.divisor}></div>
        </div>
    )
}