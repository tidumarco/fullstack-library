import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { booksReducer } from "./slices/booksSlice";
import { authorsReducer } from "./slices/authorSlice";
import { authReducer } from "./slices/authSlice";
import { usersReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    authors: authorsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
