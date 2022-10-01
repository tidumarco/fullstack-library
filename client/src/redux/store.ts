import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { booksReducer } from "./slices/booksSlice";
import { authorsReducer } from "./slices/authorSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    authors: authorsReducer,
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
