import { AxiosResponse } from "axios";
import { api } from "../../api";
import { GetBookByIdRes, GetBooksRes } from "./types";

export async function getBooks(page: number, search?: string): Promise<AxiosResponse<GetBooksRes, any>> {
    const res = await api.get("/conteudos/livro", {
        params: {
            "filter[search]": search,
            page: page,
        }
    });

    return res;
}

export async function getBookById(id: string): Promise<AxiosResponse<GetBookByIdRes, any>> {
    const res = await api.get(`/conteudos/livro/${id}`);

    return res;
}