import { AxiosResponse } from "axios";
import { api } from "../../api";
import { GetModulesByIdRes, GetModulesRes } from "./types";

export async function getModules(): Promise<AxiosResponse<GetModulesRes, any>> {
    const res = await api.get("/conteudos/modulo", {
        params: {
            per_page: 99
        }
    });

    return res;
}

export async function getModulesById(id: string): Promise<AxiosResponse<GetModulesByIdRes, any>> {
    const res = await api.get(`/conteudos/modulo/${id}`);

    return res;
}