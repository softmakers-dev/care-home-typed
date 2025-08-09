import axios, { AxiosInstance } from 'axios';

const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL || '';
console.log("backendBaseURL", backendBaseURL);
export const customAxios: AxiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/care-home',
    // baseURL: 'http://care-home-backend:8080/care-home'
    // baseURL: 'http://3.37.44.69:8080/care-home'
    baseURL: backendBaseURL
    // withCredentials: true
});

export const authorizedCustomAxios: AxiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/care-home',
    // baseURL: 'http://care-home-backend:8080/care-home',
    // baseURL: 'http://3.37.44.69:8080/care-home',
    baseURL: backendBaseURL,
    withCredentials: true
});

export const setAccessTokenInAxiosHeaders = (token: AuthType.Token) => {
    authorizedCustomAxios.defaults.headers.common[
        `Authorization`
        ] = `${token.type} ${token.accessToken}`;
};

