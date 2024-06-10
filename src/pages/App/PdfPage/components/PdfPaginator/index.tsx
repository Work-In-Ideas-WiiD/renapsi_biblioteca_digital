import styles from './styles.module.scss';

export function PdfPaginator() {
    return (
        <article className={styles.card}>
            <div className={styles.page_handler}>
                <button>C</button>
                <button>B</button>
            </div>
            <div className={styles.divisor}>

            </div>
            <div className={styles.page_count}>

            </div>
        </article>
    )
}