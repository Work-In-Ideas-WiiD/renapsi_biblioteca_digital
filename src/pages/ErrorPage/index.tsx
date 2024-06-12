import styles from './styles.module.scss';
import LogoImg from '../../assets/imgs/nova_logo_renapsi.png';
import ErrorImg from '../../assets/imgs/error_png.png';

export function ErrorPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header>
                    <img className={styles.logo} src={LogoImg} alt="Biblioteca digital" />
                </header>
                <section className={styles.body}>
                    <img src={ErrorImg} alt="" />
                    <p>Desculpe, houve um problema com está página :(</p>
                </section>

            </div>
        </main>
    )
}