import styles from './styles.module.scss';
import LogoImg from '../../assets/svgs/logo_header.svg';
import ChevronIcon from '../../assets/svgs/chevron_left_white.svg';
import MenuIcon from '../../assets/svgs/menu_icon_white.svg';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    showBackButton: boolean,
    backButtonRoute?: string
}

export function Header({ showBackButton, backButtonRoute }: HeaderProps) {

    const navigate = useNavigate();

    function goBack() {
        if (backButtonRoute) {
            return navigate(backButtonRoute);
        }
        return navigate(-1);
    }

    return (
        <header className={styles.header}>
            <div className={styles.back_button_container}>
                {
                    showBackButton && (
                        <button onClick={goBack} className={styles.button_go_back}>
                            <img src={ChevronIcon} alt="voltar" />
                        </button>
                    )
                }
            </div>
            <img src={LogoImg} alt="logotipo biblioteca digital" />
            <Link to={"#"}>
                <button className={styles.menu}>
                    <img src={MenuIcon} alt="menu" />
                </button>
            </Link>
        </header>
    )
}