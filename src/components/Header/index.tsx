import styles from './styles.module.scss';
import LogoImg from '../../assets/imgs/nova_logo_renapsi.png';
import ChevronIcon from '../../assets/svgs/chevron_left_white.svg';
import MenuIcon from '../../assets/svgs/menu_icon_white.svg';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    showBackButton: boolean,
    backButtonRoute?: string,
    showMenuButton?: boolean,
    alternativeLogo?: boolean
}

export function Header({
    showBackButton,
    backButtonRoute,
    showMenuButton = true,
    alternativeLogo = false
}: HeaderProps) {

    const navigate = useNavigate();

    function goBack() {
        if (backButtonRoute) {
            return navigate(backButtonRoute);
        }
        return navigate(-1);
    }

    return (
        <header className={styles.header}>
            <div className={styles.button_container}>
                {
                    showBackButton && (
                        <button onClick={goBack} className={styles.button_go_back}>
                            <img src={ChevronIcon} alt="voltar" />
                        </button>
                    )
                }
            </div>
            {
                !alternativeLogo && (
                    <img className={styles.logo_1} src={LogoImg} alt="Biblioteca digital" />

                )
            }
            {
                alternativeLogo && (
                    <title>MENU</title>
                )
            }
            <div className={styles.button_container}>
                {
                    showMenuButton && (
                        <Link to={"/app/config"}>
                            <button className={styles.menu}>
                                <img src={MenuIcon} alt="menu" />
                            </button>
                        </Link>
                    )
                }
            </div>

        </header>
    )
}