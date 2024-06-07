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

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function SearchPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [booksList, setBooksList] = useState<Book[]>([]);
    const { handleSubmit, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    useEffect(() => {
        searchBooks();
    }, [])

    async function onFormSubmit(params: TFormSchema) {
        if (loading) return;
        try {
            setLoading(true);
            setSearchParams(`p=${params.search}`, {
                replace: true,
            });
            const res = await fetchBooks(params.search);
            setBooksList(res.data);
        } catch (error) {
            toast.error("Não foi possivel obter a lista de livros");
        } finally {
            setLoading(false);
        }
    }

    async function searchBooks() {
        const param = getParams();
        if (!param) {
            return
        }
        try {
            setLoading(true);
            const res = await fetchBooks(param);
            setBooksList(res.data);
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

    async function fetchBooks(search: string) {
        const { data } = await getBooks(search);
        return data;
    }

    function onErase() {
        reset({
            search: "",
        })
    }

    function renderBooksList(_bookList: Book[]) {
        if (!_bookList || booksList.length == 0) {
            return null;
        }

        return _bookList.map((item) => {
            return (
                <FileCard id={item.id} name={item.titulo} key={item.id} />
            )
        });
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
                </div>
            </section>
        </div>
    )
}