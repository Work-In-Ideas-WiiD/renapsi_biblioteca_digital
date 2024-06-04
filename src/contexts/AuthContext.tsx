import { ReactNode, useEffect, useState } from "react";
import { getMe, postLoginMoodle } from "../services/http/auth";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api, setAuthToken } from '../services/http/api';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../services/http/auth/types";
import { AuthContext } from "../hooks/useAuth";

interface IAuthContextDataProps {
    children: ReactNode
}

export interface IAuthContextData {
    signIn: (email: string, password: string) => Promise<void>,
    me: UserData,
}

export function AuthContextData({ children }: IAuthContextDataProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [me, setMe] = useState<UserData>({
        id: "",
        admin: false,
        email: "",
        email_verificado_em: null
    })

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(removeAuth);

        return () => {
            subscribe();
        }
    }, [removeAuth]);

    async function refreshUserData() {
        const { data } = await getMe();
        setUserData(data);
    }

    function setUserData(data: any) {
        setMe(data);
    }


    async function signIn(email: string, password: string) {
        try {

            const { data: login_data } = await postLoginMoodle(email, password);
            setAuthToken(login_data.access_token);
            const { data: user } = await getMe();
            setUserData(user);
            localStorage.setItem("@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN", JSON.stringify(login_data.access_token));
            // setCookie(undefined, "renapsi_biblioteca_digital.token", login_data.access_token, {
            //     maxAge: 60 * 60,
            //     path: '/'
            // });
            navigate("/app/home");
        } catch (err) {
            console.log(err);
            toast.error("E-mail ou senha inválidos.");
        }
    }

    function signOut() {
        //destroyCookie(undefined, 'renapsi_biblioteca_digital.token');
        setMe({
            id: "",
            admin: false,
            email: "",
            email_verificado_em: null
        });
        setAuthToken(" ");
        navigate("/");
    }

    function removeAuth() {
        console.log("remover auth");
        localStorage.removeItem("@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN");
        signOut();

    }

    return <AuthContext.Provider value={{
        signIn,
        me
    }}>
        {children}
    </AuthContext.Provider>
}

