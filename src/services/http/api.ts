import axios from 'axios';

const controller = new AbortController();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    signal: controller.signal
});

function setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = "Bearer" + token;
}

function abortRequest() {
    controller.abort();
}


export { api, abortRequest, setAuthToken };