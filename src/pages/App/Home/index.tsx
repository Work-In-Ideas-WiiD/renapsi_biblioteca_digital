import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";

export function Home() {
    return (
        <div className={styles.main}>
            <Header />
        </div>
    )
}