import styles from './styles.module.scss';
import ChevronTop from '../../../../../assets/svgs/pdfPaginator/pdf_paginator_chevron_top.svg';
import ChevronDown from '../../../../../assets/svgs/pdfPaginator/pdf_paginator_chevron_down.svg';

interface PdfPaginatorProps {
    currentPage: number,
    pages: number,
    handlePage: (value: "up" | "down") => void
}

export function PdfPaginator({ currentPage, pages, handlePage }: PdfPaginatorProps) {
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
            <div className={styles.divisor}>

            </div>
            <div className={styles.page_count}>
                <span>{currentPage}</span>
                <span>/</span>
                <span>{pages}</span>
            </div>
        </article>
    )
}