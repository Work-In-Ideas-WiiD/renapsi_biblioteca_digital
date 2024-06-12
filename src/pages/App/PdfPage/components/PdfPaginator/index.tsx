import styles from './styles.module.scss';
import ChevronTop from '../../../../../assets/svgs/pdfPaginator/pdf_paginator_chevron_top.svg';
import ChevronDown from '../../../../../assets/svgs/pdfPaginator/pdf_paginator_chevron_down.svg';
import ZoomInIcon from '../../../../../assets/svgs/pdfPaginator/zoom_in_icon.svg';
import ZoomOutIcon from '../../../../../assets/svgs/pdfPaginator/zoom_out_icon.svg';

interface PdfPaginatorProps {
    currentPage: number,
    pages: number,
    zoomLabel: number,
    handlePage: (value: "up" | "down") => void
    handleZoom: (value: "up" | "down") => void
}

export function PdfPaginator({ currentPage, pages, zoomLabel, handlePage, handleZoom }: PdfPaginatorProps) {
    return (
        <article className={styles.card}>
            <div className={styles.page_handler}>
                <button
                    onClick={
                        () => { handlePage("up") }
                    }>
                    <img src={ChevronTop} alt="" />
                </button>
                <button
                    onClick={
                        () => { handlePage("down") }
                    }>
                    <img src={ChevronDown} alt="" />
                </button>
            </div>
            <div className={styles.divisor}></div>
            <div className={styles.zoom_container}>
                <button
                    className={styles.zoom_btn}
                    onClick={
                        () => { handleZoom("up") }
                    }>
                    <img src={ZoomInIcon} alt="Aumentar zoom" />
                </button>
                <button
                    className={styles.zoom_btn}
                    onClick={
                        () => { handleZoom("down") }
                    }>
                    <img src={ZoomOutIcon} alt="Diminuir zoom" />
                </button>
                <span>{zoomLabel}%</span>
            </div>
            <div className={styles.divisor}></div>
            <div className={styles.page_count}>
                <span>{currentPage}</span>
                <span>/</span>
                <span>{pages}</span>
            </div>
        </article>
    )
}