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
    removeAuth: () => void,
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
        const { '@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN': token } = parseCookies();
        if (token && location.pathname.includes("app")) {
            setAuthToken(token);
            getMe().then((response) => {
                const { data: user_data } = response;
                setUserData(user_data);
                navigate("/app/home");
            }).catch(() => {
                removeAuth();
                navigate("/");
            });
        } else {

            if (location.pathname.includes("app")) {
                navigate("/");
            }
        }

    }, []);

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(removeAuth);

        return () => {
            subscribe();
        }
    }, [removeAuth]);

    function setUserData(data: any) {
        setMe(data);
    }


    async function signIn(email: string, password: string) {
        try {

            const { data: login_data } = await postLoginMoodle(email, password);
            setAuthToken(login_data.access_token);
            const { data: user } = await getMe();
            setUserData(user);
            setCookie(undefined, "@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN", login_data.access_token, {
                maxAge: 60 * 60,
                path: '/'
            });
            navigate("/app/home");
        } catch (err) {
            console.log(err);
            toast.error("E-mail ou senha inválidos.");
        }
    }

    function signOut() {
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
        destroyCookie(undefined, '@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN');
        signOut();

    }

    return <AuthContext.Provider value={{
        signIn,
        removeAuth,
        me
    }}>
        {children}
    </AuthContext.Provider>
}

