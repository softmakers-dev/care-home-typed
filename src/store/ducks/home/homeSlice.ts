import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHomeArticles } from "./homeThunk";

const initialState: HomeType.homeStateProps = {
    storiesScrollPosition: "left",
    articles: [],
    isLoading: true,
    isExtraArticleLoading: false,
    extraArticlesCount: 0,
    isAsyncError: false,
    hoveredUser: null,
    isCopiedNotification: false,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        notificateIsCopied: (state) => {
            state.isCopiedNotification = true;
        },
        closeIsCopiedNotification: (state) => {
            state.isCopiedNotification = false;
        },
        changeStoriesScrollPosition: (
            state,
            action: PayloadAction<HomeType.StoriesScrollPositionType>,
        ) => {
            state.storiesScrollPosition = action.payload;
        },
        increaseExtraArticlesCount: (state) => {
            state.extraArticlesCount++;
        },
        updateUploadedArticle: (
            state,
            action: PayloadAction<PostType.ArticleProps>,
        ) => {
            state.articles.unshift({
                ...action.payload,
                followLoading: false,
            });
        },
        updateRecentComments: (
            state,
            action: PayloadAction<{
                comment: PostType.CommentType;
                postId: number;
            }>,
        ) => {
            state.articles.forEach((article) => {
                if (article.postId === action.payload.postId) {
                    article.recentComments.unshift(action.payload.comment);
                }
            });
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getHomeArticles.pending, (state) => {
                state.isLoading = true;
                state.isAsyncError = false;
            })
            .addCase(getHomeArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.isLoading = false;
            })
            .addCase(getHomeArticles.rejected, (state) => {
                state.isLoading = false;
                state.isAsyncError = true;
            })
    }
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;

