import { ReactComponent as Home } from "../../../assets/Svgs/home.svg";
import { ReactComponent as HomeActive } from "../../../assets/Svgs/home-active.svg";

import { ReactComponent as ManagersActive } from "../../../assets/Svgs/direct-active.svg";

import { ReactComponent as ClientsActive } from "../../../assets/Svgs/new-article-active.svg";

import { ReactComponent as CaregiversActive } from "../../../assets/Svgs/map-active.svg";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {useRef, useState} from "react";

import SubNav from "./SubNav";

import { useAppSelector } from "../../../store/Hooks";
import useOutsideClick from "../../../hooks/useOutsideClick";

const Container = styled.div`
    flex: 1 0 0%;
    display: flex;
    justify-content: flex-end;
`;

const NavLitemContainer = styled.div`
    display: flex;
    padding-left: 24px;
`;

const NavItemWrapper = styled.div`
    display: inline-flex;
    align-items: center;

    & + & {
        margin-left: 22px;
    }
    & > div {
        cursor: pointer;
    }
`;

const AvatarWrapper = styled(NavItemWrapper)<{ isSubnavModalOn: boolean }>`
    .profile {
        cursor: pointer;
    }

    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border: ${(props) =>
    props.isSubnavModalOn ? `1px solid #262626` : `none`};
        border-radius: 50%;

        img {
            border-radius: 50%;
            width: 24px;
            height: 24px;
        }
    }
`;

const NavItems = () => {
    const [ isSubnavModalOn, setIsSubnavMoalOn ] = useState(false);
    const userInfo = useAppSelector((state) => state.authInfo.userInfo);
    const navContainerRef = useRef<HTMLDivElement | null>(null);
    const subModalControllerRef = useRef<HTMLDivElement | null>(null);
    useOutsideClick( navContainerRef, setIsSubnavMoalOn, subModalControllerRef );

    const navItems = [
        {
            id: "home",
            path: "/",
            component: <Home />,
            activeComponent: <HomeActive />
        },
        {
            id: "managers",
            path: "/managers",
            component: "메니저",
            activeComponent: <ManagersActive />
        },
        {
            id: "clients",
            path: "/clients",
            component: "보호자",
            activeComponent: <ClientsActive />
        },
        {
            id: "care-givers",
            path: "/caregivers",
            component: "보호사",
            activeComponent: <CaregiversActive />
        }
    ];

    return (
        <Container>
            <NavLitemContainer>
                { navItems.map((navItem) => (
                    <NavItemWrapper key={navItem.id}>
                        <NavLink to={navItem.path}>
                            {navItem.component}
                        </NavLink>
                    </NavItemWrapper>
                ))}

                <AvatarWrapper isSubnavModalOn={isSubnavModalOn}>
                    <div
                        ref={subModalControllerRef}
                        onClick={() => {
                            setIsSubnavMoalOn(!isSubnavModalOn);
                        }}
                        className="profile"
                    >
                        <div className="img-container">
                            (<img
                                alt="user님의 프로필 사진"
                                data-testid="user-avatar"
                                draggable="false"
                                src={userInfo?.memberImageUrl}
                            />)
                        </div>{isSubnavModalOn && (
                            <SubNav
                                username={userInfo?.memberUsername}
                                containerRef={navContainerRef}
                            />
                        )}

                    </div>
                </AvatarWrapper>
            </NavLitemContainer>
        </Container>
    );
}

export default NavItems;
