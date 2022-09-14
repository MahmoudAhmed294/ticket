import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import languageSlice from "./languageSlice";
import ticketsSlice from "./ticketsSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    tickets:ticketsSlice,

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
