import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "../../../customAxios";

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
