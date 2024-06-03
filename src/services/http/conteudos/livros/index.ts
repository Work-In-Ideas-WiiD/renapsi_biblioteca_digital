import { AxiosResponse } from "axios";
import { api } from "../../api";
import { Book, GetBooksRes } from "./types";

export async function getBooks(): Promise<AxiosResponse<GetBooksRes, any>> {
    const res = await api.get("/conteudos/livro");

    return res;
}

export async function getBookById(id: string): Promise<AxiosResponse<Book, any>> {
    const res = await api.get(`/conteudos/livro/${id}`);

    return res;
}