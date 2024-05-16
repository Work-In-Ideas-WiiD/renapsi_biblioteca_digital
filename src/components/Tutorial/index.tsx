import { useState } from 'react';
import styles from './styles.module.scss';
import { CustomButton } from '../form/Button';
//page 1
import ImgBgPage1 from "../../assets/imgs/tutorial_bg_1.jpg";
import Page1Effect1 from "../../assets/svgs/tutorial_1_effect_1.svg"
import Page1Effect2 from "../../assets/svgs/tutorial_1_effect_2.svg"
//page 2
import ImgBgPage2 from "../../assets/imgs/tutorial_bg_2.jpg";
//page 3
import ImgBgPage3 from "../../assets/imgs/tutorial_bg_3.jpg";
import Page2Effect1 from "../../assets/svgs/tutorial_2_effect_1.svg"

export function Tutorial() {
    const [page, setPage] = useState<0 | 1 | 2 | 3>(1);
    if (page == 0) {
        return null;
    }

    function finishTutorial() {
        localStorage.setItem("@RENAPSI_BIBLIOTECA_DIGITAL__TUTORIAL", JSON.stringify(true));
        setPage(0);
    }

    if (page == 1) {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_container}>
                    <img className={styles.page_1_effect_1} src={Page1Effect1} alt="" />
                    <img className={styles.page_1_effect_2} src={Page1Effect2} alt="" />
                    <img className={styles.bg_page_1} src={ImgBgPage1} alt="" />
                    <p className={styles.label}>Acesse a <strong>Biblioteca Digital</strong><br />a qualquer hora, de qualquer lugar</p>
                    <div className={styles.page_count_container}>
                        <div className={styles.dot_filled}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                    <div className={styles.button_container}>
                        <button onClick={() => { finishTutorial() }} className={styles.transparent_button}>Pular</button>
                        <CustomButton onClick={() => { setPage(2) }} title='Próximo' />
                    </div>
                </div>
            </div>
        )
    }

    if (page == 2) {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_container}>
                    <img className={styles.page_1_effect_1} src={Page2Effect1} alt="" />
                    <img className={styles.bg_page_2} src={ImgBgPage2} alt="" />
                    <div className={styles.bg_gradiente}></div>
                    <div className={`${styles.label} ${styles.label_page_2}`}>Você pode baixar os arquivos direto<br />no <strong>seu celular</strong></div>
                    <div className={styles.page_count_container}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot_filled}></div>
                        <div className={styles.dot}></div>
                    </div>
                    <div className={styles.button_container}>
                        <button onClick={() => { finishTutorial() }} className={styles.transparent_button}>Pular</button>
                        <CustomButton onClick={() => { setPage(3) }} title='Próximo' />
                    </div>
                </div>
            </div>
        )
    }

    if (page == 3) {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_container}>
                    <img className={styles.bg_page_3} src={ImgBgPage3} alt="" />
                    <div className={styles.bg_gradiente}></div>
                    <div className={`${styles.label} ${styles.label_page_2}`}>Pesquise pelos <strong>títulos</strong> dos livros <br />ou pelos <strong>módulos</strong> das disciplinas</div>
                    <div className={styles.page_count_container}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot_filled}></div>
                    </div>
                    <div className={styles.button_container}>
                        <button onClick={() => { finishTutorial() }} className={styles.transparent_button}>Pular</button>
                        <CustomButton onClick={() => { finishTutorial() }} title='Próximo' />
                    </div>
                </div>
            </div>
        )
    }
}