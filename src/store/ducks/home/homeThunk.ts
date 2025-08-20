import { createAsyncThunk } from '@reduxjs/toolkit';
import { authorizedCustomAxios } from "../../../customAxios";
import { RecentArticlesProps } from "./homeThunk.type";

export const getHomeArticles = createAsyncThunk<PostType.ArticleStateProps[]>(
    "home/getHomeArticles",
    async (payload, ThunkOptions) => {
        try {
            const {
                data: { data },
            }: RecentArticlesProps = await authorizedCustomAxios.get(
                `/posts/recent`,
            );
            const articlesState: PostType.ArticleStateProps[] = data.map(
                (article) => ({
                    ...article,
                    followLoading: false,
                }),
            );
            return articlesState;
        } catch (error) {
            // error === FAIL_TO_REISSUE_MESSAGE &&
            //     ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    }
);
