import { createAsyncThunk } from "@reduxjs/toolkit";

import { SignInRequestType, SignUpRequestType } from "./authThunk.type";
import { authorizedCustomAxios, customAxios } from "../../../customAxios";
import { authInfoActions } from "./AuthInfoSlice";

export const signUp = createAsyncThunk<{ status: number, data: boolean }, SignUpRequestType> (
    "auth/signUp",
    async ( payload, ThunkOptions ) => {

        try {
            const { status, data } =
                await customAxios.post(`/signup`, {
                    password: payload.password,
                    email: payload.email,
                    userName: payload.userName,
                    code: payload.code
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            ThunkOptions.dispatch( authInfoActions.changeButtonLoadingState(false) );

            if ( status === 200 || status === 201 ) {
                ThunkOptions.dispatch( authInfoActions.resetUserInputData() );
                ThunkOptions.dispatch(
                    signIn({
                        username: payload.userName,
                        password: payload.password,
                        email: payload.email,
                        name: null
                    }),
                );
            } else {
                throw new Error("사용자 등록에 실패하였습니다.");
            }

            return { status, data };
        } catch ( error ) {
            if ( !window.navigator.onLine ) {
                throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
            } else {
                throw ThunkOptions.rejectWithValue(error);
            }
        }
    }
)


export const fetchGithubAuthInfo = createAsyncThunk<AuthType.Token, string> (
    "auth/githubSignUp",
    async ( payload, ThunkOptions ) => {

        try {
            const response = await fetch('http://localhost.com:3001/auth/github/callback', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ payload }),
            });

            if ( !response.ok ) {
                throw new Error('Fetching Github Auth Data failed!');
            }

            const data = await response.json();
            if ( data.user.login ) {
                ThunkOptions.dispatch(
                    authInfoActions.saveUserInputTemporary({
                        password: "",
                        email: null,
                        githubId: data.user.login,
                        githubAvatarUrl: data.user.avatar_url,
                        userName: null
                    })
                )
            }

            return data;
        } catch (error) {

            if (!window.navigator.onLine) {
                throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
            } else {
                throw ThunkOptions.rejectWithValue(error);
            }
        }
    }
);

export const signIn = createAsyncThunk<AuthType.Token, SignInRequestType> (
    "auth/signIn",
    async (payload, ThunkOptions) => {
        try {
            const {data: {data}} = await customAxios.post("/login", {
                email: payload.email,
                password: payload.password,
                name: null,
                username: payload.email
            });
            return data;
        } catch ( error ) {

            if (!window.navigator.onLine) {
                throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
            } else {
                const checkUsername = async () => {
                    try {
                        const config = {
                            params: {
                                username: payload.username
                            }
                        }

                        const { data } = await customAxios.get(
                            '/accounts/check',
                            config
                        )
                        return data;
                    } catch (error) {
                        throw ThunkOptions.rejectWithValue(error);
                    }
                }

                await ThunkOptions.dispatch( checkUsername ).then(
                    ( result ) => {
                        console.log("checkUserName: ", result);
                        ThunkOptions.dispatch(authInfoActions.hasUser( result ));
                    }
                );
                throw ThunkOptions.rejectWithValue(error);
            }
        }
    }
)

export const getUserInfo = createAsyncThunk<AuthType.UserInfo>(
    "auth/userInfo",
    async (payload, ThunkOptions) => {
        try {
            const response = await authorizedCustomAxios.get(
                "/accounts/profile",
            );

            return response.data.data;
        } catch (error) {
            // error === FAIL_TO_REISSUE_MESSAGE &&
            //     ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

export const logout = createAsyncThunk<void, void>(
    "auth/logout",
    async (payload, ThunkOptions) => {
        try {
            await authorizedCustomAxios.post(`/logout`);
        } catch (error) {
            ThunkOptions.rejectWithValue(error);
        }
    },
);

