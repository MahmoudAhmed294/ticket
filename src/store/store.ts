import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import languageSlice from "./languageSlice";
import ticketsSlice from "./ticketsSlice";
import paymentSlice from "./paymentSlice";
import { LoginApi } from "api/loginApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CardApi } from "api/cardApi";

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    tickets:ticketsSlice.reducer,
    payment:paymentSlice.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [CardApi.reducerPath]: CardApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApi.middleware),
  devTools:
    process.env.NODE_ENV !== "production"
      ? {
          actionCreators: {
            ...languageSlice.actions,
            ...ticketsSlice.actions,
            ...paymentSlice.actions,
          },
        }
      : false,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
