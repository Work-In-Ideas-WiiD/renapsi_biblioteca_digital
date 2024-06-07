import styles from './styles.module.scss';
import IconSearch from "../../assets/svgs/icon_search_black.svg";

export function NoContentMessage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon_wrapper}>
                <img src={IconSearch} alt="" />
            </div>
            <p>Nenhum conteúdo foi encontrado.</p>
        </div>
    )
}