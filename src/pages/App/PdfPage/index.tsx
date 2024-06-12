import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Document, Page } from 'react-pdf'
import { useEffect, useState } from 'react';
import { getBookById } from '../../../services/http/conteudos/livros';
import { toast } from 'react-toastify';
import { pdfjs } from 'react-pdf';
import { PdfPaginator } from './components/PdfPaginator';
import { Book } from '../../../services/http/conteudos/livros/types';
import ChevronLeftIcon from "../../../assets/svgs/chevron_left_pdf_scren.svg";
import MenuIcon from "../../../assets/svgs/menu_icon_pdf_page.svg";
import DownloadIcon from "../../../assets/svgs/pdfMenu/download.svg";
import PrintIcon from "../../../assets/svgs/pdfMenu/print.svg";
import ShareIcon from "../../../assets/svgs/pdfMenu/share.svg";
import copy from 'copy-to-clipboard';
import { usePreviousRoute } from '../../../hooks/usePreviousRoute';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "../../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

export function PdfPage() {
    const params = useParams();
    const { getPreviousLocation } = usePreviousRoute();
    const navigator = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [book, setBook] = useState<Book>({
        id: "",
        arquivo: "",
        titulo: ""
    } as Book);

    useEffect(() => {
        fetchPdf();
    }, []);

    async function fetchPdf() {

        const id = params.id;
        if (!id) {
            return
        }

        try {
            const { data } = await getBookById(id);
            setBook(data.data);
            setPdfUrl(data.data.arquivo);
        } catch (error) {
            toast.error("Erro ao carregar pdf")
        }
    }

    async function fetchAndPrintPDF(url: string) {
        try {
            // Fetch the PDF from the URL
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }

            // Get the PDF blob
            const blob = await response.blob();

            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);

            // Create an iframe to hold the PDF
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none'; // Hide the iframe
            iframe.src = blobUrl;

            // Add the iframe to the document
            document.body.appendChild(iframe);

            // Wait for the iframe to load the PDF
            iframe.onload = () => {
                // Print the PDF
                iframe.contentWindow?.print();

                // Clean up
                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl);

                }, 1000)

            };
        } catch (error) {
            toast.error('Erro ao imprimir o pdf');
        } finally {
            setIsMenuOpen(false);
        }
    }

    function renderMenu(render: boolean) {
        if (render) {
            return (
                <ul className={styles.header_menu}>
                    <li onClick={handleDownloadPdf}>
                        <div className={styles.icon_box}>
                            <img src={DownloadIcon} alt="" />
                        </div>
                        <span>Fazer download</span>
                    </li>
                    <li onClick={copyLink}>
                        <div className={styles.icon_box}>
                            <img src={ShareIcon} alt="" />
                        </div>
                        <span>Copiar link</span>
                    </li>
                    <li onClick={() => { fetchAndPrintPDF(pdfUrl) }}>
                        <div className={styles.icon_box}>
                            <img src={PrintIcon} alt="" />
                        </div>
                        <span>Imprimir</span>
                    </li>

                </ul>
            )
        }

        return null;
    }

    function copyLink() {
        copy(pdfUrl);
        toast.success("Link copiado");
        setIsMenuOpen(false);
    }

    function handleDownloadPdf() {
        const formatedTitle = replaceSpacesWithHyphens(book.titulo) + ".pdf";
        downloadPDF(pdfUrl, formatedTitle);
    }

    async function downloadPDF(url: string, filename: string) {
        try {
            // Fetch the PDF from the URL
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }

            // Get the PDF blob
            const blob = await response.blob();

            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;

            // Append the link to the document
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    function replaceSpacesWithHyphens(text: string): string {
        return text.replace(/ /g, '-');
    }

    function renderPdf(link: string) {
        if (!link || link == "") {
            return null;
        }

        return (
            <>
                <div className={styles.pdf_container}>
                    <Document
                        className={styles.pdf_file}
                        file={link}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={"Carregando pdf"}
                        error={"Erro ao carregar o pdf"}
                    >
                        <Page
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            pageNumber={currentPage}
                            scale={1}
                            loading={"Carregando pdf"}
                            error={"Erro ao carregar o pdf"}
                        />
                    </Document>

                    <div className={styles.paginator_container}>
                        <PdfPaginator
                            pages={numPages}
                            currentPage={currentPage}
                            handlePage={handlePage}
                        />
                    </div>
                </div>
            </>
        )
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function handlePage(value: "up" | "down") {
        if (value == "up") {
            return pageUp();
        }

        return pageDown();
    }

    function pageUp() {
        if (numPages > currentPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function pageDown() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goBack() {
        const lastRoute = getPreviousLocation();

        if (lastRoute && lastRoute != "") {
            return navigator(lastRoute);
        }
        navigator("app/home");
    }

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.header_container}>
                    <button className={styles.action_btn} onClick={goBack}>
                        <img src={ChevronLeftIcon} alt="voltar" />
                    </button>
                    <title>{book.titulo}</title>
                    <button
                        className={`${styles.action_btn} ${styles.back_button}`}
                        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
                    >
                        <img src={MenuIcon} alt="menu" />
                    </button>
                    {renderMenu(isMenuOpen)}
                </div>
            </header>
            {renderPdf(pdfUrl)}
        </div>
    )
}