import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import sprite from "../../../assets/Images/sprite3.png"
import ImageSprite from "../../common/ImageSprite";
import { customAxios } from "../../../customAxios";
import useInput from "../../../hooks/useInput";
import Input from "../../common/Input";
import SubmitButton from "../SubmitButton";
import Button from "../../../styles/UI/Button";
import { authInfoActions } from "../../../store/ducks/auth/AuthInfoSlice";
import { signUp } from "../../../store/ducks/auth/authThunk";
import Loading from "../../common/Loading";

import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    .form-description {
        min-width: 350px;
        padding: 8px 28px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-size: 16px;
            line-height: 24px;
            margin: -6px 0 -6px;
            font-weight: 600;
            margin-top: 16px;
            margin-bottom: 8px;
        }
        .image {
            background-size: 569px 521px;
        }
        .description {
            margin-top: 16px;
            margin-bottom: 16px;
            font-size: 14px;
            line-height: 18px;
            margin: -3px 0 -4px;
            font-weight: 400;
        }
        .recall_confirmEmail {
            display: inline-block;
            padding: 0;
            border: 0;
            color: ${(props) => props.theme.color.blue};
        }
    }

    .input-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 8px 0px;

        .errorMessage {
            color: #ed4956;
            font-size: 14px;
            line-height: 18px;
            text-align: center;
            margin: 10px 40px;
        }
    }
`;const messageImage: CommonType.ImageProps = {
    width: 87,
    height: 62,
    $position: `-430px -5px`,
    $url: sprite,
};

const EmailConfirmForm = () => {

    const userInput = useAppSelector(( state ) => state.authInfo.signUpUserData);
    const dispatch = useAppDispatch();
    const [ errorMessage, setErrorMessage ] = useState("");
    const isLoading = useAppSelector(( state ) => state.authInfo.isLoading);

    const [ codeInputProps, isValid, isFocus ] = useInput(
        "",
        undefined,
        (value: string) => value.length === 6,
    );

    const reCallEmailConfirmHandler = () => {
        const callEmailConfirmAPI = async ({
           email,
           userName,
       }: {
            email: string | null;
            userName: string | null;
        }) => {
            try {
                await customAxios.post(`/accounts/email`, {
                    email,
                    userName,
                });
            } catch (error) {
                console.log(error, `user email confirm api error`);
            }
        };
        userInput &&
        callEmailConfirmAPI({
            email: userInput.email,
            userName: userInput.userName,
        });
    };

    const submitButtonClickHandler = () => {
        dispatch( authInfoActions.changeButtonLoadingState(true) );

        const callSignUpAPI = async () => {
            if( !userInput ) return;
            try{
                const response = await dispatch(
                    signUp({
                        ...userInput,
                        code: codeInputProps.value
                    }),
                ).unwrap();

                if( response.status === 200 && !response.data ) {
                    setErrorMessage("사용자 등록에 실패하였습니다.")
                }
            } catch (error) {
                console.log(error, `call signUp api`);
            }
        };
        callSignUpAPI();
    }

    return (
        <Container>
            <div className="form-description">
                <ImageSprite className="image" {...messageImage} />
                <div className="title">인증 코드 입력</div>
                <div className="description">
                    {userInput?.email} 주소로 전송된 인증 코드를 입력하세요.
                    <button
                        className="recall_confirmEmail"
                        type="button"
                        onClick={reCallEmailConfirmHandler}
                    >
                        코드 재전송.
                    </button>
                </div>
            </div>
            <div className="input-form">
                <Input
                    type="text"
                    inputName="code"
                    innerText="인증 코드"
                    inputProps={codeInputProps}
                    isFocus={isFocus}
                />
                <SubmitButton
                    type="submit"
                    onClick={submitButtonClickHandler}
                    disabled={!isValid}
                >
                    {isLoading ? (
                        <Loading size={18} isInButton={true} />
                    ) : (
                        "다음"
                    )}
                </SubmitButton>
                <Button
                    bgColor="white"
                    color="#0095F6"
                    type="button"
                    onClick={() =>
                        dispatch(authInfoActions.changeFormState("signUp"))
                    }
                >
                    돌아가기
                </Button>
                {errorMessage && (
                    <div className="errorMessage">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default EmailConfirmForm;
