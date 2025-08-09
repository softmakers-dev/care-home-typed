import styled from "styled-components";
import { useLocation } from "react-router-dom";

import SignUpForm from "./SignUpForm/SignUpFormContent";
import ContentBox from "../common/ContentBox";
import { useAppSelector } from "../../store/Hooks";
import LoginForm from "./LoginForm/LoginFormContent";
import EmailConfirmForm from "./SignUpForm/EmailConfirmForm";
import Suggest from "./Suggest";

const Container = styled.div<{ $pathname: string }>`
    display: flex;
    flex-direction: column;
    min-height: ${(props) => (props.$pathname === "/" ? 0 : 100)}vh;
    margin-top: 12px;
    justify-content: center;
    max-width: 350px;
    flex-grow: 1;

    .warning-message {
        padding: 5px;
        text-align: center;
        color: red;

        .warning {
            font-weight: 700;
            margin-right: 5px;
        }

        .not-instagram {
            text-decoration: underline;
        }
    }
`;

const contentBox: UIType.ContentBoxProps = {
    $padding: `10px 0`,
    $margin: `0 0 10px`,
};

export default function Form(props: { router: "signIn" | "signUp" }) {

    const { pathname } = useLocation();
    const currentForm = useAppSelector((state) => state.authInfo.currentFormState);

    return (
        <Container $pathname={pathname}>
            <ContentBox $padding={contentBox.$padding} $margin={contentBox.$margin}>
                { props.router === "signIn" ? (
                    <LoginForm />
                )  : currentForm === "confirmEmail" ? (
                    <EmailConfirmForm />
                ) : (
                    <SignUpForm />
                )}
            </ContentBox>
            <ContentBox $padding={contentBox.$padding} $margin={contentBox.$margin}>
                <Suggest />
            </ContentBox>
        </Container>
    );
}
