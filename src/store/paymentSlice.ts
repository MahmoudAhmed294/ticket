import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCard, getMember, PostBill } from "api/Api";
import { Card, Member } from "api/types";
import { RootState } from "./store";

export interface TicketsState {
  status: "idle" | "loading" | "failed";
  card: Card | undefined;
  member: Member | undefined;
  payMethod: "Cash" | "Card" | "Visa";
  billNumber: number;
}

const initialState: TicketsState = {
  status: "failed",
  card: undefined,
  member: undefined,
  payMethod: "Cash",
  billNumber: 0,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    payMethod: (state, action: PayloadAction<any>) => {
      state.payMethod = action.payload;
      state.card =undefined
      state.member =undefined
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCard.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getCard.fulfilled, (state, action) => {
        state.status = "idle";
        state.card = action.payload?.card;
        state.member = action.payload?.member;
        state.billNumber = action.payload?.billID;
        

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
        state.member = action.payload.member;
        state.billNumber = action.payload.billID;
      })
      .addCase(getMember.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(PostBill.pending, (state) => {
        state.status = "loading";
      })

      .addCase(PostBill.fulfilled, (state, action) => {
        state.status = "idle";
        state.card = undefined;
        state.member = undefined;
        state.payMethod = "Cash";
        state.billNumber = 0;
      })
      .addCase(PostBill.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { payMethod ,reset} = paymentSlice.actions;

export const getStatus = (state: RootState) => state.payment.status;
export const getCardInfo = (state: RootState) => state.payment.card;
export const getMemberInfo = (state: RootState) => state.payment.member;
export const getBillNumber = (state: RootState) => state.payment.billNumber;

export default paymentSlice.reducer;
