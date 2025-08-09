import { useAppSelector } from "../../../store/Hooks";
import PasswordEdit from "../Menus/PasswordEdit";

import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Section = () => {

    const currentMenu = useAppSelector((state) => state.edit.currentMenu);
    const renderComponent = () => {
        switch (currentMenu) {
            case "비밀번호 변경":
                return <PasswordEdit />;
        }
    };
    return(
        <Container>
            { renderComponent() }
        </Container>
    );
}

export default Section;
