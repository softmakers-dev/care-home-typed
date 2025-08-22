import { selectModal } from "../../../store/ducks/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../store/Hooks";
import { ReactComponent as SettingSvg } from "../../../assets/Svgs/setting.svg";
import { ReactComponent as ThreeDots } from "../../../assets/Svgs/threeDots.svg";
import React  from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SettingsModal from "../Modals/SettingsModal";
import UserActionModal from "../Modals/UserActionModal";

interface ProfileHeaderContainerProps {
    me: boolean;
}

const ProfileHeaderContainer = styled.header<ProfileHeaderContainerProps>`
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
    align-items: stretch;

    .profile-img {
        margin-right: 30px;
        display: flex;
        justify-content: center;
    }

    .profile-content {
        .name-with-icon {
            display: flex;
            align-items: center;
            flex-shrink: 1;

            .name {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 300;
                font-size: 28px;
                line-height: 32px;
                margin: -5px 0 -6px;
            }

            .edit {
                background-color: transparent;
                margin-left: 20px;
                border: ${(props) => props.me && "1px solid #dbdbdb"};
                border-radius: 4px;
                color: #262626;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                padding: 5px 9px;
                text-align: center;
                text-overflow: ellipsis;
            }

            .following {
                display: flex;
                align-items: center;

                .dm-button {
                    display: flex;
                    align-items: center;
                }
                button {
                    margin-left: 10px;
                    border: 1px solid #dbdbdb;
                    color: #262626;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 5px 9px;
                    height: 30px;
                }
            }

            svg {
                margin: 8px;
                cursor: pointer;
            }

            .follow-button {
                margin-left: 10px;
            }
        }

        .follower {
            display: flex;
            margin-bottom: 20px;

            .follower-with-number {
                margin-right: 40px;
                font-size: 16px;

                span {
                    font-weight: 600;
                }
            }

            li:not(:first-child) {
                cursor: pointer;
            }
        }

        .detail-info {
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
        }
    }

    @media (min-width: 736px) {
        margin-bottom: 44px;

        .profile-img {
            flex-grow: 1;
        }

        .profile-content {
            flex-basis: 30px;
            flex-grow: 5;

            .name-with-icon {
                margin-bottom: 20px;
            }
        }
    }
`;

interface ProfileHeaderProps {}

const ProfileHeader = ({}: ProfileHeaderProps) => {
    const dispatch = useAppDispatch();

    const memberProfile = useAppSelector(
        (state) => state.profile.memberProfile as Profile.MemberProfileProps,
    );
    const modal = useAppSelector((state) => state.profile.modal);

    return (
        <ProfileHeaderContainer me={memberProfile?.me}>
            <section className="profile-content">
                <div className="name-with-icon">
                    <h2 className="name">{memberProfile?.memberUsername}</h2>
                    {memberProfile?.me ? (
                        <>
                            <Link className="edit" to={"/accounts/edit"}>
                                프로필 편집
                            </Link>
                            <SettingSvg
                                onClick={() => {
                                    dispatch(selectModal("setting"));
                                }}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    <ThreeDots
                        onClick={() => {
                            dispatch(selectModal("userAction"));
                        }}
                    />
                </div>
                <div className="detail-info">{memberProfile?.memberName}</div>
            </section>
            {modal === "userAction" && (
                <UserActionModal
                    onModalOn={() => {
                        dispatch(selectModal("userAction"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}

            {modal === "setting" && (
                <SettingsModal
                    onModalOn={() => {
                        dispatch(selectModal("setting"));
                    }}
                    onModalOff={() => {
                        dispatch(selectModal(null));
                    }}
                />
            )}
        </ProfileHeaderContainer>
    );
}

export default ProfileHeader;
