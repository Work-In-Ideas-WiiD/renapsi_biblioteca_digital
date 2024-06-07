import axios, { AxiosError, AxiosInstance } from 'axios';

const controller = new AbortController();

type SignOut = () => void;

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

function setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = "Bearer" + token;
}
function tryToFillTheToken() {
    const token = localStorage.getItem("@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN");
    if (token) {
        setAuthToken(token);
    }
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    signal: controller.signal
}) as APIInstanceProps;
tryToFillTheToken();

let failedQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
        console.log("rodando isso aqui");

        if (requestError?.response?.status === 401) {
            console.log("erro 401");

            if (requestError.response.data?.message === "Unauthenticated.") {
                const auth_token = localStorage.getItem("@RENAPSI_BIBLIOTECA_DIGITAL.TOKEN");

                if (!auth_token) {
                    signOut();
                    return Promise.reject(requestError);
                }

                const originalRequestConfig = requestError.config;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSuccess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                                resolve(api(originalRequestConfig));
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error);
                            }
                        })
                    })
                }
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {
                        console.log("refresh");
                        setAuthToken(auth_token);
                        const { data } = await await api.post(`/auth/refresh`);
                        setAuthToken(data.access_token);
                        if (originalRequestConfig.data) {
                            originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
                        }

                        originalRequestConfig.headers = { 'Authorization': `Bearer ${data.access_token}` };
                        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

                        failedQueue.forEach((req) => {
                            req.onSuccess(data.access_token);
                        });
                        console.log("resolvido demais reqs");

                        resolve(api(originalRequestConfig));
                    } catch (error: any) {
                        failedQueue.forEach((req) => {
                            req.onFailure(error);
                        })
                        signOut();
                        reject(error);
                    } finally {
                        isRefreshing = false;
                        failedQueue = [];
                    }
                })
            }
            signOut();
        }

        if (requestError.response && requestError.response.data) {
            return Promise.reject(requestError);
            //criar classe AppError
        } else {
            return Promise.reject(requestError);
        }
    });

    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    }
}


export { api, setAuthToken };