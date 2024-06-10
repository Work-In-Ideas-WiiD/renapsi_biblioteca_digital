import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Document, Page } from 'react-pdf'
import { useEffect, useState } from 'react';
import { getBookById } from '../../../services/http/conteudos/livros';
import { toast } from 'react-toastify';

import { pdfjs } from 'react-pdf';
//import "../../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "../../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();


export function PdfPage() {
    const params = useParams();
    const [pdfUrl, setPdfUrl] = useState("");
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

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


            // const blob = await fetchPdfAsBlob(data.data.arquivo);
            // const blobUrl = URL.createObjectURL(blob);
            // console.log(blobUrl);

            setPdfUrl(data.data.arquivo);
        } catch (error) {
            toast.error("Erro ao carregar pdf")
        }
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    async function fetchPdfAsBlob(url: string): Promise<Blob> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Obter o leitor de stream da resposta
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Failed to get reader from response body');
        }

        // Armazenar os pedaços de dados do PDF
        const chunks: Uint8Array[] = [];
        let receivedLength = 0;

        // Ler os dados da resposta
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
                chunks.push(value);
                receivedLength += value.length;
            }
        }

        // Concatena todos os pedaços de dados
        const pdfArray = new Uint8Array(receivedLength);
        let position = 0;
        for (const chunk of chunks) {
            pdfArray.set(chunk, position);
            position += chunk.length;
        }

        // Cria um Blob a partir do Uint8Array
        const blob = new Blob([pdfArray], { type: 'application/pdf' });

        return blob;
    }

    function renderPdf(link: string) {
        if (!link || link == "") {
            return null;
        }

        return (
            <>
                <Document
                    file={link}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={{ workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js` }}

                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </>
        )
    }

    return (
        <div className={styles.main}>
            {renderPdf(pdfUrl)}
        </div>
    )
}