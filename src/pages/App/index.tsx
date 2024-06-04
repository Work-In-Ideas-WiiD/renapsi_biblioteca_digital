import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export function AppPage() {

    return (
        <main className={styles.main}>
            <Outlet></Outlet>
        </main>
    )
}