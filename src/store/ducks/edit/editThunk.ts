import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "../../../customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "../../../utils/constants";
import { authInfoActions } from "../auth/AuthInfoSlice";

export const changePassword = createAsyncThunk<
        any,
        { newPassword: string; oldPassword: string }
    >("edit/password", async (payload, ThunkOptions) => {
    try {
        const { data } = await authorizedCustomAxios.put(
            "/accounts/password",
            payload,
        );
        return data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const getEditItem = createAsyncThunk<EditType.editItemType, void>(
    "edit/getEditItem",
    async ( payload, ThunkOptions ) => {
        try {
            const { data } = await authorizedCustomAxios.get("/accounts/profile");
            delete data.data["memberImageUrl"]; // memberImageUrl 은 따로 관리하므로 제거하고 받습니다.
            if (data.data["memberGender"] === "P") {
                data.data["memberGender"] = "비공개";
            }
            if (data.data["memberGender"] === "F") {
                data.data["memberGender"] = "여성";
            }
            if (data.data["memberGender"] === "M") {
                data.data["memberGender"] = "남성";
            }

            return data.data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authInfoActions.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    }
);

export const edit = createAsyncThunk<any, EditType.editItemType>(
    "edit",
    async ( payload, ThunkOptions ) => {
        try {
            const gender = payload.memberGender;
            let genderEN = "PRIVATE";

            switch (gender) {
                case "비공개":
                    genderEN = "P";
                    break;
                case "남성":
                    genderEN = "M";
                    break;
                case "여성":
                    genderEN = "F";
                    break;
            }
            const { data } = await authorizedCustomAxios.put("/accounts/profile", {
                ...payload,
                memberGender: genderEN,
            });
            return data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);
