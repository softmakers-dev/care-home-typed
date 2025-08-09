import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Form from "../components/auth/Form";
import { authInfoActions } from "../store/ducks/auth/AuthInfoSlice";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { setAccessTokenInAxiosHeaders } from "../customAxios";

const Section = styled.section`
    flex-shrink: 0;
    min-height: 100vh;
    overflow: hidden;

    .form-container {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }
`;

function AuthenticationPage(props: { router: "signIn" | "signUp" }) {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const userInfo = useAppSelector( (state) => state.authInfo.userInfo );

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('accessToken');

        if( token && !userInfo ) {
            window.history.replaceState({}, document.title, window.location.pathname);
            setAccessTokenInAxiosHeaders({type: 'Bearer', accessToken: token})
            dispatch( authInfoActions.login() );
        } else {
            dispatch(authInfoActions.changeFormState(props.router));
        }
    }, [props.router, dispatch, location.search, userInfo]);

    return (
        <Section>
            <main className="form-container">
                <Form router={ props.router } />
            </main>
        </Section>
    );
}

export default AuthenticationPage;
