import styled from "styled-components";

import sprite from "../../../assets/Images/care-home.png";
import ImageSprite from "../../common/ImageSprite";
import FacebookLogin from "../FacebookLogin";
import InputAndButton from "./InputAndButton";
import Line from "../Line";

const SignUpFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
        margin: 22px auto 12px;
    }

    .signUpForm {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        .signUpMessage {
            font-size: 17px;
            margin: 0 40px 10px;
            color: ${(props) => props.theme.font.gray};
            font-weight: ${(props) => props.theme.font.bold};
            line-height: 20px;
            text-align: center;
        }
    }
`;

const instagramImage: CommonType.ImageProps = {
    width: 210,
    height: 67,
    $position: `-140px -150px`,
    $url: sprite,
};

export default function SignUpForm() {

    return (
        <SignUpFormContainer>
            <ImageSprite {...instagramImage} className="logo" />
            <form method="post" className="signUpForm">
                <h2 className="signUpMessage">
                    Github에 가입하고 소스코드를 공유하세요.
                </h2>
                <FacebookLogin color="#fff" />
                <Line />
                <InputAndButton />
                <input type="hidden" name="mode" value="signup" />
                {/*<Line />*/}
                {/*<AskingButton*/}
                {/*    mainText="계정이 있으신가요?"*/}
                {/*    subText="로그인"*/}
                {/*    formState="signIn"*/}
                {/*/>*/}
            </form>
        </SignUpFormContainer>
    );
}
