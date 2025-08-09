import { MouseEvent } from "react";

import Input from "../../common/Input";
import SubmitButton from "../SubmitButton";
import {
    emailFormValidator,
    passwordValidator, usernameValidator,
} from "./validator";
import useInput from "../../../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../../../store/Hooks";
import { authInfoActions } from "../../../store/ducks/auth/AuthInfoSlice";
import { customAxios } from "../../../customAxios";
import Loading from "../../common/Loading";


export default function InputAndButton() {

    const [emailInputProps, emailIsValid, emailIsFocus] = useInput(
        "",
        emailFormValidator,
    );
    const [usernameInputProps, usernameIsValid, usernameIsFocus] = useInput(
        "",
        usernameValidator,
    );
    const [passwordInputProps, passwordIsValid, passwordIsFocus] = useInput(
        "",
        passwordValidator,
    );

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector( (state) => state.authInfo.isLoading );

    const signupButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(authInfoActions.changeButtonLoadingState(true));

        const requestEmailConfirm = async ({
           email,
           userName,
        }: {
            email: string;
            userName: string;
        }) => {
            try {
                const {
                    data: { status },
                } = await customAxios.post(`/accounts/email`, {
                    email,
                    userName,
                });
                dispatch(authInfoActions.changeButtonLoadingState(false));

                if (status === 200) {
                    dispatch(authInfoActions.changeFormState("confirmEmail"));
                    dispatch(
                        authInfoActions.saveUserInputTemporary({
                            email: emailInputProps.value,
                            userName: usernameInputProps.value,
                            password: passwordInputProps.value,
                            githubAvatarUrl: null,
                            githubId: null
                        }),
                    );
                }

            } catch (error) {
                dispatch(authInfoActions.changeButtonLoadingState(false));
                console.log(error, `user email confirm api error`);
            }
        };

        requestEmailConfirm({
            email: emailInputProps.value,
            userName: usernameInputProps.value,
        });
    };

    return (
        <>
            <Input
                inputName="username"
                type="text"
                innerText="이메일 주소"
                inputProps={emailInputProps}
                isValid={emailIsValid}
                isFocus={emailIsFocus}
                hasValidator={ emailFormValidator }
            />
            <Input
                inputName="username"
                type="text"
                innerText="사용자 이름"
                inputProps={ usernameInputProps }
                isValid={ usernameIsValid }
                isFocus={ usernameIsFocus }
                hasValidator={ usernameValidator }
            />
            <Input
                inputName="password"
                type="password"
                innerText="비밀번호"
                inputProps={ passwordInputProps }
                isValid={ passwordIsValid }
                isFocus={ passwordIsFocus }
                hasValidator={ passwordValidator }
            />
            <SubmitButton onClick={ signupButtonClickHandler }
            >
                { isLoading ? <Loading size={18} isInButton={true} /> : "가입" }
            </SubmitButton>
        </>
    );
}
