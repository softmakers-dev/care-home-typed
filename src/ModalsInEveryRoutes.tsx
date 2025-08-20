import React from 'react';
import { modalActions } from "./store/ducks/modal/modalSlice";
import Notifications from "./styles/UI/Notification";
import HoverModal from "./components/Home/Modals/HoverModal";
import { useAppDispatch, useAppSelector } from "./store/Hooks";

const ModalsInEveryRoutes = () => {

    const {
        home: { isCopiedNotification },
        modal: {
            miniProfile,
        },
    } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const hoverModalMouseEnterHandler = () => {
        dispatch(modalActions.mouseOnHoverModal());
    };
    const hoverModalMouseLeaveHandler = () => {
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 500);
    };

    return (
        <>
            {isCopiedNotification && (
                <Notifications text="링크를 클립보드에 복사했습니다." />
            )}
            {miniProfile && (
                <HoverModal
                    onMouseEnter={hoverModalMouseEnterHandler}
                    onMouseLeave={hoverModalMouseLeaveHandler}
                    miniProfile={miniProfile}
                />
            )}
        </>
    );
}

export default ModalsInEveryRoutes;
