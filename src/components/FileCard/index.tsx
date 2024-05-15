import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import IconBook from "../../assets/svgs/icon_book_white.svg"

export function FileCard() {
    return (
        <Link to={""} className={styles.card}>
            <article>
                <div className={styles.icon_wraper}>
                    <img src={IconBook} alt="livro" />
                </div>
                <h2>E01 - Ponto de partida da jor...</h2>
            </article>
        </Link>
    )
}