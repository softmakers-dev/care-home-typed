import axios, { AxiosInstance } from 'axios';

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL || '';
export const customAxios: AxiosInstance = axios.create({
    baseURL: backendBaseURL
    // withCredentials: true
});

export const authorizedCustomAxios: AxiosInstance = axios.create({
    baseURL: backendBaseURL,
    withCredentials: true
});

export const setAccessTokenInAxiosHeaders = (token: AuthType.Token) => {
    authorizedCustomAxios.defaults.headers.common[
        `Authorization`
        ] = `${token.type} ${token.accessToken}`;
};

