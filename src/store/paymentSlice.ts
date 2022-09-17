import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCard , getMember } from "api/Api";
import {  Card, Member } from "api/types";
import { RootState } from "./store";

export interface TicketsState {
  status: "idle" | "loading" | "failed";
  card: Card | undefined;
  member: Member | undefined;
}

const initialState: TicketsState = {
  status: "failed",
  card: undefined,
  member: undefined,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCard.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getCard.fulfilled, (state, action) => {
        state.status = "idle";
        state.card =action.payload?.card;
        state.member =action.payload?.member;
      })
      .addCase(getCard.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getMember.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getMember.fulfilled, (state, action) => {
        state.status = "idle";
        state.member =action.payload;
      })
      .addCase(getMember.rejected, (state) => {
        state.status = "failed";
      });


  },
});

export const {} = paymentSlice.actions;

export const getStatus = (state: RootState) => state.payment.status;
export const getCardInfo = (state: RootState) => state.payment.card;
export const getMemberInfo = (state: RootState) => state.payment.member;

export default paymentSlice.reducer;
