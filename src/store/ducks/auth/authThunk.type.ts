export interface SignUpRequestType {
    password: string;
    email: string | null;
    githubId: string | null;
    githubAvatarUrl: string | null;
    userName: string | null;
    code: string | null;
}

export interface SignInRequestType {
    email: string | null;
    password: string;
    name: string | null;
    username: string | null;
}

export type FormState = "signUp" | "confirmEmail" | "signIn";

export type LoginDevice = {
    tokenId: string;
    location: {
        city: string;
        longitude: string;
        latitude: string;
    };
    device: string;
    lastLoginDate: string;
    current: boolean;
};
