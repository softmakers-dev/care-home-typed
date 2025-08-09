import styled from "styled-components";

import ImageSprite from "../common/ImageSprite";
import sprite from "../../assets/Images/github-computer-icons-logo.jpg";
import Button from "../../styles/UI/Button";
import { MouseEvent } from "react";
import {useAppDispatch, useAppSelector} from "../../store/Hooks";
import { authInfoActions } from "../../store/ducks/auth/AuthInfoSlice";
import Loading from "../common/Loading";

const FacebookButtonContainer = styled.div`
    margin: 8px 40px;

    & > button {
        width: 100%;
        border: 1px solid transparent;

        & > div {
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 3px;
        }
    }
`;

const backgroundWhiteFacebook: CommonType.ImageProps = {
    width: 22,
    height: 16,
    $position: `0 0`,
    $url: sprite,
};

const backgroundBlueFacebook: CommonType.ImageProps = {
    width: 22,
    height: 16,
    $position: `0 0`,
    $url: sprite,
};

export default function FacebookLogin({ bgColor, color }: UIType.ButtonProps) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector( (state) => state.authInfo.isLoading );
    const windowLocationHref = process.env.REACT_APP_BACKEND_GITHUB_URL || '';
    console.log("windowLocationHref: ", windowLocationHref);

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch( authInfoActions.loading() );
        // window.location.href = 'http://localhost.com:8080/care-home/oauth2/authorization/github';
        // window.location.href = 'http://3.37.44.69:8080/care-home/oauth2/authorization/github';
        window.location.href = windowLocationHref;
    };

    return (
        <FacebookButtonContainer>
            <Button bgColor={bgColor} color={color} type="button" onClick={submitButtonClickHandler}>
                {bgColor ? (
                    <ImageSprite {...backgroundWhiteFacebook} />
                ) : (
                    <ImageSprite {...backgroundBlueFacebook} />
                )}
                { isLoading ? <Loading size={18} isInButton={true} /> : "Github으로 로그인" }
            </Button>
        </FacebookButtonContainer>
    );
}
