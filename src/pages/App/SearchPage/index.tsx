import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divisor } from "../../../components/Divisor";
import { FileCard } from "../../../components/FileCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks } from "../../../services/http/conteudos/livros";
import { Book } from "../../../services/http/conteudos/livros/types";
import { toast } from "react-toastify";
import { Paginator } from "../../../components/Paginator";
import { NoContentMessage } from "../../../components/NoContent";

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function SearchPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [booksList, setBooksList] = useState<Book[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [noContent, setNoContent] = useState(false);
    const { handleSubmit, control, reset, getValues } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    useEffect(() => {
        searchBooksWithParam();
    }, []);

    async function searchBooksWithParam() {
        const param = getParams();
        if (param) {
            searchBooks(page, param);
        }
    }

    async function onFormSubmit(params: TFormSchema) {
        if (loading) return;
        setSearchParams(`p=${params.search}`, {
            replace: true,
        });
        await searchBooks(page, params.search);
    }

    async function searchBooks(_page: number, title: string) {

        try {
            setLoading(true);
            const res = await fetchBooks(title, _page);
            setBooksList(res.data);
            setPages(res.meta.last_page);
            setNoContent(res.data.length == 0);
        } catch (error) {
            toast.error("Não foi possivel obter a lista de livros");
        } finally {
            setLoading(false);
        }
    }

    function getParams() {
        const param = searchParams.get("p");
        if (param) return param;
        return false;
    }

    async function fetchBooks(search: string, pageParam: number,) {
        const { data } = await getBooks(pageParam, search);
        return data;
    }

    function onErase() {
        reset({
            search: "",
        })
    }

    function renderBooksList(_bookList: Book[]) {
        if (!_bookList || booksList.length == 0 && loading == false) {
            return null;
        }

        return _bookList.map((item) => {
            return (
                <FileCard id={item.id} name={item.titulo} key={item.id} />
            )
        });
    }

    function onChangePage(_page: number) {
        setPage(_page);
        searchBooks(_page, getValues("search"));
    }

    return (
        <div className={styles.main}>
            <Header showBackButton={true} backButtonRoute="/app/home" />
            <section className={styles.search_section}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <InputSeach
                        fetching={loading}
                        id="search"
                        fieldName="search"
                        control={control}
                        onErase={onErase}
                        placeholder="Pesquise pelo título ou palavra chave"
                    />
                </form>
            </section>
            <Divisor />
            <section className={styles.files_wraper}>
                <div className={styles.files_list}>
                    {
                        renderBooksList(booksList)
                    }
                    {
                        noContent && !loading && (
                            <NoContentMessage />
                        )
                    }
                </div>
                <Paginator onPageChange={onChangePage} pageCount={pages} />
            </section>
        </div>
    )
}