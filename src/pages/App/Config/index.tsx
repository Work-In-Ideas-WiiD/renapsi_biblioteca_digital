import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import SupportIcon from "../../../assets/svgs/icon_help_white.svg"
import ExitIcon from "../../../assets/svgs/icon_exit_white.svg"

export function ConfigPage() {

    return (
        <div className={styles.main}>
            <Header alternativeLogo showMenuButton={false} showBackButton={true} backButtonRoute="/app/home" />
            <ul>
                <li>
                    <Link to={"/app/config/suporte"} className={styles.link}>
                        <div className={styles.icon_wraper}>
                            <img className={styles.help_icon} src={SupportIcon} alt="ajuda" />
                        </div>
                        <span>Suporte</span>
                    </Link>
                </li>
                <li>
                    <Link to={"#"} className={styles.link}>
                        <div className={styles.icon_wraper}>
                            <img src={ExitIcon} alt="sair" />
                        </div>
                        <span>Sair</span>
                    </Link>
                </li>
            </ul>

        </div>
    )
}