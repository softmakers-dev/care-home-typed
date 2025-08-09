import { MouseEvent } from "react";

import useInput from "../../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { signIn } from "../../../store/ducks/auth/authThunk";
import Input from "../../common/Input";
import SubmitButton from "../SubmitButton";
import Loading from "../../common/Loading";

const placeholder = {
    username: "이메일 주소",
    password: "비밀번호",
};

export default function LoginFormAndButton () {

    const [usernameInputProps, usernameIsValid, usernameIsFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 0,
    );
    const [passwordInputProps, passwordIsValid, passwordIsFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 5,
    );

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.authInfo.isLoading);

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        const requestSignIn = async () => {
            await dispatch(
                signIn({
                    username: usernameInputProps.value,
                    password: passwordInputProps.value,
                    email: usernameInputProps.value,
                    name: null
                }),
            );
        };

        requestSignIn();
    };

    return (
        <>
            <Input
                type="text"
                inputName="username"
                innerText={placeholder.username}
                inputProps={usernameInputProps}
                isFocus={usernameIsFocus}
            />
            <Input
                type="password"
                inputName="password"
                innerText={placeholder.password}
                inputProps={passwordInputProps}
                isFocus={passwordIsFocus}
            />
            <SubmitButton
                type="submit"
                onClick={submitButtonClickHandler}
                disabled={!(usernameIsValid && passwordIsValid)}
            >
                { isLoading ? <Loading size={18} isInButton={true} /> : "로그인" }
            </SubmitButton>
        </>
    );
}
