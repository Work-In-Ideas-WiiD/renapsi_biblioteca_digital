import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import IconBook from "../../assets/svgs/icon_book_white.svg"

interface FileCardProps {
    id: string,
    name: string
}

export function FileCard({ id, name }: FileCardProps) {
    return (
        <Link
            to={`/app/pdf/${id}`}
            className={styles.card}
        >
            <article>
                <div className={styles.icon_wraper}>
                    <img loading="lazy" src={IconBook} alt="livro" />
                </div>
                <h2>{name}</h2>
            </article>
        </Link>
    )
}