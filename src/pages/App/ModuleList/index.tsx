import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";
import { Divisor } from "../../../components/Divisor";

import ImgBgModuleTest from '../../../assets/imgs/module_test.jpg';
import { FileCard } from "../../../components/FileCard";


export function ModuleList() {

    return (
        <div className={styles.main}>
            <Header showBackButton={true} backButtonRoute="/app/home" />
            <article className={styles.card_module}>
                <img src={ImgBgModuleTest} alt="modulo x" />
            </article>
            <Divisor />
            <section className={styles.files_wraper}>
                <div className={styles.files_list}>
                    <FileCard />
                    <FileCard />
                    <FileCard />
                </div>
            </section>
        </div>
    )
}