import { Pagination } from "../../types";

export interface GetModulesRes extends Pagination<Module> { }
export interface GetModulesByIdRes {
    data: Module
}

export interface Module {
    id: string,
    nome: string,
    descricao: string,
    icone: string,
    criado_em: string,
    livros: any[],
    pivot?: {
        livro_id: string,
        modulo_id: string,
        created_at: string,
        updated_at?: string,
    }
}
