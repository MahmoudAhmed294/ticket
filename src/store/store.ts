import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import languageSlice from "./languageSlice";
import ticketsSlice from "./ticketsSlice";
import paymentSlice from "./paymentSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    tickets:ticketsSlice,
    payment:paymentSlice

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
