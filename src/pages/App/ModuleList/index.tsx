import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";
import { Divisor } from "../../../components/Divisor";

import ImgBgModuleTest from '../../../assets/imgs/module_test.jpg';
import { FileCard } from "../../../components/FileCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Module } from "../../../services/http/conteudos/module/types";
import { getModulesById } from "../../../services/http/conteudos/module";
import { toast } from "react-toastify";
import { Book } from "../../../services/http/conteudos/livros/types";
import { getBooks } from "../../../services/http/conteudos/livros";


export function ModuleList() {
    let { id } = useParams();
    const [module, setModule] = useState<Module>({
        id: "",
        icone: ""
    } as Module);
    const [bookList, setBookList] = useState<Book[]>([]);

    useEffect(() => {
        fetchModules();
        fetchBooks();
    }, [])

    async function fetchModules() {
        try {
            const { data } = await getModulesById(id!);
            setModule(data.data);
        } catch (error) {
            toast.error("Houve um erro ao carregar o modulo");
        }
    }

    async function fetchBooks() {
        try {
            const { data } = await getBooks();
            setBookList(data.data);
        } catch (error) {
            toast.error("Houve um erro ao carregar os livros");
        }
    }

    function renderBookList(_books: Book[]) {
        if (_books && _books.length > 0) {
            return _books.map((book) => {
                return (
                    <FileCard key={book.id} id={book.id} name={book.titulo} />
                )
            })
        }

        return null;
    }

    return (
        <div className={styles.main}>
            <Header showBackButton={true} backButtonRoute="/app/home" />
            {
                module.id && (
                    <div className={styles.card_module}>
                        <img src={module.icone} alt={module.nome} />
                    </div>
                )
            }
            <Divisor />
            <section className={styles.files_wraper}>
                <div className={styles.files_list}>
                    {renderBookList(bookList)}
                </div>
            </section>
        </div>
    )
}