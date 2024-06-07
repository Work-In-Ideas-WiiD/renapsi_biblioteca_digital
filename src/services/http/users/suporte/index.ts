import { AxiosResponse } from "axios";
import { api } from "../../api";

export async function postSuporte(
    email: string,
    texto?: string
): Promise<AxiosResponse<any, any>> {
    const res = await api.post(`/users/suporte`, {
        email,
        texto
    });

    return res;
}