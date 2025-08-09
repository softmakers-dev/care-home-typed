import styled from "styled-components";

import { useAppSelector } from "../../../store/Hooks";
import Logo from '../../../assets/Images/care-home.png';
import LoginFormAndButton from "./FormAndButton";
import FacebookLogin from "../FacebookLogin";
import Line from "../Line";

const FormContainer = styled.div`
    .logo-container {
        text-align: center;
    }

    .logo {
        margin-top: 1rem;
        width: 200px;
    }

    .inputContainer {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        max-width: 350px;
        width: 100%;

        a {
            margin-top: 12px;
            font-size: 12px;
            line-height: 16px;
            color: #385185;
            width: 100%;
            text-align: center;
            text-decoration: none;
        }

        .inputForm {
            display: flex;
            flex-direction: column;

            .loginForm {
                margin-top: 24px;
                display: flex;
                flex-direction: column;
            }
            .errorMessage {
                color: #ed4956;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                margin: 10px 40px;
            }
        }
    }
`;

export default function LoginForm() {
    const errorMessage = useAppSelector((state) => state.authInfo.errorMessage);

    return (
        <FormContainer>
            <div className="logo-container">
                <img src={Logo} alt="hello world 로고" className="logo" />
            </div>

            <div className="inputContainer">
                <form className="inputForm">
                    <div className="loginForm">
                        <LoginFormAndButton />
                        <Line />
                        <FacebookLogin color="#fff" />
                        {/*<Line />*/}
                        {/*<AskingButton*/}
                        {/*    mainText="계정이 없으신가요?"*/}
                        {/*    subText="가입하기"*/}
                        {/*    formState="signUp"*/}
                        {/*/>*/}
                    </div>
                    { errorMessage && (
                        <div className="errorMessage">
                            <p>{ errorMessage }</p>
                        </div>
                    ) }
                </form>
            </div>
        </FormContainer>
    );
}
