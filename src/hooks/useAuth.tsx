import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getMe, postLogin, postLoginMoodle } from "../services/http/auth";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api, setAuthToken } from '../services/http/api';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { UserData } from "../services/http/auth/types";

interface IAuthContextDataProps {
    children: ReactNode
}

interface IAuthContextData {
    // setUserData: (data: any) => void,
    // handleFetching: (option: boolean) => void,
    signIn: (email: string, password: string) => Promise<void>,
    // signOut: () => void,
    // refreshUserData: () => Promise<void>,
    me: UserData,
    // fetching: boolean,
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
    const [fetching, setFetching] = useState(false);


    useEffect(() => {
        // const { 'renapsi_biblioteca_digital.token': token } = parseCookies();
        // if (token) {
        //     setAuthToken(token);
        // getMe().then((response) => {
        //     const { data: user_data } = response;
        //     setUserData(user_data);
        //     navigate("/dashboard/home");
        // }).catch(() => {
        //     destroyCookie(undefined, 'renapsi_biblioteca_digital.token');
        //     navigate("/");
        // });
        // } else {
        //     if (location.pathname.includes("dashboard")) {
        //         navigate("/");
        //     }
        // }
        if (me.id == "" && location.pathname.includes("app")) {
            navigate("/");
        }
        handleAxiosErros();
    }, [])

    function handleAxiosErros() {
        console.log("axios error");

        api.interceptors.response.use(response => {
            return response
        }, (error: AxiosError) => {
            console.log("err status", error);

            if (error.response?.status == 401) {
                toast.error("Sessão expirada");
                signOut();
            }

            return Promise.reject(error);
        })
    }

    async function refreshUserData() {
        const { data } = await getMe();
        setUserData(data);
    }

    function setUserData(data: any) {
        setMe(data);
    }

    function handleFetching(option: boolean) {
        setFetching(option);
    }

    async function signIn(email: string, password: string) {
        try {
            handleFetching(true);
            const { data: login_data } = await postLoginMoodle(email, password);
            setAuthToken(login_data.access_token);
            const { data: user } = await getMe();
            setUserData(user);
            // setCookie(undefined, "renapsi_biblioteca_digital.token", login_data.access_token, {
            //     maxAge: 60 * 60,
            //     path: '/'
            // });
            handleFetching(false);
            navigate("/app/home");
        } catch (err) {
            console.log(err);
            handleFetching(false);
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

    return <AuthContext.Provider value={{
        //setUserData,
        // handleFetching,
        signIn,
        // signOut,
        // refreshUserData,
        me,
        // fetching,
    }}>
        {children}
    </AuthContext.Provider>
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}