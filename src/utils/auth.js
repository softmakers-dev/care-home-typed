export function getAuthInfo() {
    const token = localStorage.getItem('token');

    return { token };
}

export function authInfoLoader() {
    return getAuthInfo();
}
