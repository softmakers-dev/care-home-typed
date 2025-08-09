import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signIn, getUserInfo, logout } from "./authThunk";
import { FormState } from "./authThunk.type";
import { setAccessTokenInAxiosHeaders } from "../../../customAxios";

export interface AuthStateProps {
    isLogin: boolean;
    isAsyncReject: boolean;
    isLoading: boolean;
    errorMessage: string;
    hasUsername: boolean | null,
    isRefreshTokenChecking: boolean;
    signUpUserData: AuthType.signUpUserData | null;
    userInfo: AuthType.UserInfo | null;
    currentFormState: FormState;
}

const initialState: AuthStateProps = {
    isLogin: false,
    isAsyncReject: false,
    isLoading: false,
    errorMessage: "",
    hasUsername: null,
    isRefreshTokenChecking: false,
    signUpUserData: null,
    userInfo: null,
    currentFormState: "signIn"
}

const authInfoSlice = createSlice({
    name: 'authInfo',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
        loading: (state) => {
            state.isLoading = true;
        },
        hasUser: (state, action: PayloadAction<{ data: boolean }>) => {
            state.hasUsername = action.payload.data;
        },
        changeFormState: (state, action: PayloadAction<FormState>) => {
            state.currentFormState = action.payload;
        },
        saveUserInputTemporary: (
            state,
            action: PayloadAction<AuthType.signUpUserData>
        ) => {
            state.signUpUserData = action.payload;
        },
        resetUserInputData: (state) => {
            state.signUpUserData = null;
        },
        changeButtonLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setToken(state, action) {
            if ( state.signUpUserData !== null ) {
                // state.signUpUserData.token = action.payload;
            }
        },
        setGithubId(state, action) {
            if ( state.signUpUserData !== null ) {
                state.signUpUserData.githubId = action.payload;
            }
        },
        setGithubAvatarUrl(state, action) {
            if ( state.signUpUserData !== null ) {
                state.signUpUserData.githubAvatarUrl = action.payload;
            }
        }
    },
    extraReducers: (build) => {
        build
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                setAccessTokenInAxiosHeaders(action.payload);
                state.isLoading = false;
                state.isLogin = true;
                state.errorMessage = "";
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAsyncReject = true;
                state.isLoading = false;
                if (action.payload && typeof action.payload === "string") {
                    state.errorMessage = action.payload;
                } else if ( state.hasUsername ) {
                    state.errorMessage = `잘못된 비밀번호입니다. 다시 확인하세요.`;
                } else {
                    state.errorMessage = `입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.`;
                }
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogin = false;
                state.isLoading = false;
            })
        ;
    }
})

export const authInfoActions = authInfoSlice.actions;

export const authInfoReducer = authInfoSlice.reducer;
