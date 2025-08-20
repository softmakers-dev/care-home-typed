import { configureStore } from "@reduxjs/toolkit";
import { authInfoReducer } from "./ducks/auth/AuthInfoSlice";
import { editReducer } from "./ducks/edit/editSlice";
import { modalReducer } from "./ducks/modal/modalSlice";
import { homeReducer } from "./ducks/home/homeSlice";

export const store = configureStore({
   reducer: {
      authInfo: authInfoReducer,
      edit: editReducer,
      modal: modalReducer,
      home: homeReducer
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
