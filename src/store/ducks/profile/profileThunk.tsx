import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "../../../customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "../../../utils/constants";
import { authInfoActions } from "../auth/AuthInfoSlice";

export const lookUpUserProfile = createAsyncThunk<
    Profile.MemberProfileProps,
    {
        username: string;
    }
>("profile/lookUpUserProfile", async (payload, ThunkOptions) => {
    try {
        const { data } = await authorizedCustomAxios.get(
            `/accounts/${payload.username}`,
        );

        return data.data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authInfoActions.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});
