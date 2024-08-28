import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { GetLoginRes, UserData } from "./types";

export async function postLogin(email: string, password: string): Promise<AxiosResponse<GetLoginRes, AxiosError<any>>> {
    const res = await api.post("/auth/login", {
        email,
        password
    });

    return res;
}

export async function postLoginMoodle(username: string, password: string): Promise<AxiosResponse<GetLoginRes, any>> {
    const res = await api.post("/auth/login/moodle", {
        username,
        password
    });

    return res;
}

export async function getMe(): Promise<AxiosResponse<UserData, any>> {
    const res = await api.post("/auth/me");

    return res;
}