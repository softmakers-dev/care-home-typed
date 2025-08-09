import { configureStore } from "@reduxjs/toolkit";
import { authInfoReducer } from "./ducks/auth/AuthInfoSlice";
import { editReducer } from "./ducks/edit/editSlice";

export const store = configureStore({
   reducer: {
      authInfo: authInfoReducer,
      edit: editReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false
      })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
