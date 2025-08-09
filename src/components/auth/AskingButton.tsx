import styled from "styled-components";
import { MouseEvent } from "react";

import Button from "../../styles/UI/Button";
import { useAppDispatch } from "../../store/Hooks";
import { authInfoActions } from '../../store/ducks/auth/AuthInfoSlice';
import { FormState } from "../../store/ducks/auth/authThunk.type";

const AskingButtonContainer = styled.div`
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

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
`;

const MainText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333; // Choose your main color
`;

const SignUpText = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #1877f2; // Facebook blue or your accent color
  cursor: pointer;
  margin-top: 2px;
`;

export default function AskingButton ( props: { mainText: string, subText: string, formState: FormState} ) {

    const dispatch = useAppDispatch();

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(authInfoActions.changeFormState(props.formState));
    }

    return (
        <AskingButtonContainer>
            <StyledButton type="button" onClick={onClickHandler}>
                <MainText>{props.mainText}</MainText>
                <SignUpText>{props.subText}</SignUpText>
            </StyledButton>
        </AskingButtonContainer>
    );
}
