import { RootState } from "../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInfoActions } from "../auth/AuthInfoSlice";
import { authorizedCustomAxios } from "../../../customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "../../../utils/constants";

interface GetMiniProfileResponseType extends AxiosType.ResponseType {
    data: ModalType.MiniProfileProps;
}

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileStateProps,
    {
        memberUsername: string;
        modalPosition: ModalType.ModalPositionProps;
    },
    { state: RootState }
>(
    "modal/getMiniProfile",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const currentMinProfileState = getState().modal.miniProfile;
        if (currentMinProfileState?.memberUsername === payload.memberUsername)
            return {
                ...currentMinProfileState,
                isLoading: false,
                modalPosition: payload.modalPosition,
            };

        try {
            const {
                data: { data },
            } = await authorizedCustomAxios.get<GetMiniProfileResponseType>(
                //
                `/accounts/profile`,
            );

            return {
                ...data,
                isLoading: false,
                modalPosition: payload.modalPosition,
            };
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authInfoActions.logout());
            throw rejectWithValue(error);
        }
    }
);
