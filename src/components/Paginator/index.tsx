import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';
import ChevronLeftIcon from "../../assets/svgs/paginator/chevron-left.svg"
import ChevronRightIcon from "../../assets/svgs/paginator/chevron-right.svg"


interface PaginatorProps {
    onPageChange: (page: number) => void,
    pageCount: number,
}

export function Paginator({ onPageChange, pageCount }: PaginatorProps) {
    if (pageCount === 1) return null

    return (
        <ReactPaginate
            pageCount={pageCount}
            previousLabel={(<img className={styles.chevron_icon} src={ChevronLeftIcon} />)}
            nextLabel={<img className={styles.chevron_icon} src={ChevronRightIcon} />}
            pageRangeDisplayed={2}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            breakClassName={styles.break}
            activeClassName={styles.active}
            nextClassName={styles.nextPage}
            previousClassName={styles.prevPage}
            pageClassName={styles.page}
            className={styles.paginator}
            containerClassName={styles.paginator}
            renderOnZeroPageCount={null}
        />
    )
}