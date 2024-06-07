import { Pagination } from "../../types";
import { Module } from "../module/types";

export interface GetBooksRes extends Pagination<Book> { }

export interface Book {
    id: string,
    arquivo: string,
    criado_em: string,
    modulos: Module[],
    tags: Tag[],
    titulo: string
}

export interface Tag {
    id: string
    nome: string
    created_at: string
    updated_at: string
    deleted_at: string
    pivot: {
        livro_id: string
        tag_id: string
        created_at: string
        updated_at: string
    }
}