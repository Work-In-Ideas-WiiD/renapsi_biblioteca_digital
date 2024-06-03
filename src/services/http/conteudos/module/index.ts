import { AxiosResponse } from "axios";
import { api } from "../../api";
import { GetModulesRes, Module } from "./types";

export async function getModules(): Promise<AxiosResponse<GetModulesRes, any>> {
    const res = await api.get("/conteudos/modulo");

    return res;
}

export async function getModulesById(id: string): Promise<AxiosResponse<Module, any>> {
    const res = await api.get(`/conteudos/modulo/${id}`);

    return res;
}