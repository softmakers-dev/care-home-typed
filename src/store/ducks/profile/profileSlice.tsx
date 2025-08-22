import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lookUpUserProfile } from "./profileThunk";

export interface InitialStateType {
    isLoading: boolean;
    memberProfile: Profile.MemberProfileProps | null;
    currentCategory: Profile.currentCategoryType;
    modal: Profile.modalType;
}

const initialState: InitialStateType = {
    isLoading: false,
    memberProfile: null,
    currentCategory: "uploaded",
    modal: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        selectModal: (state, action: PayloadAction<Profile.modalType>) => {
            state.modal = action.payload;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(lookUpUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpUserProfile.fulfilled, (state, action) => {
                state.memberProfile = action.payload;
                state.isLoading = false;
            })
            .addCase(lookUpUserProfile.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const {
    selectModal,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
