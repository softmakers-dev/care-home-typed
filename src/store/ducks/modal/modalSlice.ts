import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMiniProfile } from "./modalThunk";

const initialState: ModalType.ModalStateProps = {
    activatedModal: null,
    memberUsername: "",
    memberImageUrl: "",
    postId: null,
    commentId: null,
    miniProfile: null,
    isFollowing: null,
    isOnMiniProfile: false,
    isArticleAloneModalOn: false,
    articleAloneModalPostId: null,
};

interface HoverModalPayloadType {
    memberUsername: string;
    memberImageUrl: string;
}

interface ArticleMenuModalPayloadType extends HoverModalPayloadType {
    postId: number;
    isFollowing: boolean;
}

const modalSclice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        startHoverModal: (
            state,
            action: PayloadAction<HoverModalPayloadType>,
        ) => {
            state.isOnMiniProfile = true;
            state.activatedModal = null;
            state.memberUsername = action.payload.memberUsername;
            state.memberImageUrl = action.payload.memberImageUrl;
        },
        startArticleMenuModal: (
            state,
            action: PayloadAction<ArticleMenuModalPayloadType>,
        ) => {
            state.isOnMiniProfile = false;
            state.activatedModal = "articleMenu";
            state.postId = action.payload.postId;
            state.memberUsername = action.payload.memberUsername;
            state.memberImageUrl = action.payload.memberImageUrl;
            state.isFollowing = action.payload.isFollowing;
        },
        changeActivatedModal: (
            state,
            action: PayloadAction<ModalType.ActivatedModalType>,
        ) => {
            state.activatedModal = action.payload;
        },
        setCommentId: (state, action: PayloadAction<{ commentId: number }>) => {
            state.commentId = action.payload.commentId;
        },
        mouseOnHoverModal: (state) => {
            state.isOnMiniProfile = true;
        },
        mouseNotOnHoverModal: (state) => {
            state.isOnMiniProfile = false;
        },
        maintainModalon: (
            state,
            action: PayloadAction<ModalType.ActivatedModalType>,
        ) => {
            if (action.payload === "unfollowing" && state.isOnMiniProfile) {
                state.isOnMiniProfile = true;
                state.activatedModal = "unfollowing";
            } else {
                state.activatedModal = action.payload;
            }
        },
        resetModal: (state) => {
            return initialState;
        },
        checkMouseOnHoverModal: (state) => {
            if (
                !state.isOnMiniProfile &&
                state.activatedModal !== "unfollowing" // hover에서 팔로잉 클릭해서 언팔로우 모달이 켜질 경우 유지
            ) {
                return initialState;
            } else {
                return state;
            }
        },
        changeHoverModalPosition: (
            state,
            action: PayloadAction<ModalType.ModalPositionProps>,
        ) => {
            if (state.miniProfile) {
                state.miniProfile.modalPosition = action.payload;
            }
        },
        startArticleAloneModal: (
            state,
            action: PayloadAction<{ postId: number }>,
        ) => {
            state.isArticleAloneModalOn = true;
            state.articleAloneModalPostId = action.payload.postId;
        },
        maintainArticleAloneModal: (state) => {
            state.isArticleAloneModalOn = true;
        },
        stopArticleAloneModal: (state) => {
            state.isArticleAloneModalOn = false;
            state.articleAloneModalPostId = null;
        },
    },
    extraReducers: (build) => {

        build
            .addCase(getMiniProfile.pending, (state) => {
                state.miniProfile = null;
            })
            .addCase(getMiniProfile.fulfilled, (state, action) => {
                state.miniProfile = action.payload;
                state.isOnMiniProfile = true;
            })
            .addCase(getMiniProfile.rejected, (state) => {
                state.miniProfile = null;
                state.isOnMiniProfile = false;
            })
    }
});

export const modalReducer = modalSclice.reducer;
export const modalActions = modalSclice.actions;
