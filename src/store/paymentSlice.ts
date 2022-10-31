import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostBill,
  getBillNumber,
  getBillNumberOfTicket,
  postBalance,
} from "api/Api";
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
      state.card = undefined;
      state.member = undefined;
    },
    reset: () => initialState,
    addCard: (state, action: PayloadAction<any>) => {
      state.card = action.payload.card;
      state.member = action.payload.member;
    },
  },
  extraReducers: (builder) => {
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
    builder
      .addCase(getBillNumber.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getBillNumber.fulfilled, (state, action) => {
        state.status = "idle";
        state.billNumber = action.payload;
      })
      .addCase(getBillNumber.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getBillNumberOfTicket.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getBillNumberOfTicket.fulfilled, (state, action) => {
        state.status = "idle";
        state.billNumber = action.payload;
      })
      .addCase(getBillNumberOfTicket.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(postBalance.pending, (state) => {
        state.status = "loading";
      })

      .addCase(postBalance.fulfilled, (state, action) => {
        state.status = "idle";
        state.card = action.payload;
      })
      .addCase(postBalance.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { payMethod, reset ,addCard } = paymentSlice.actions;

export const getStatus = (state: RootState) => state.payment.status;
export const getCardInfo = (state: RootState) => state.payment.card;
export const getMemberInfo = (state: RootState) => state.payment.member;
export const billNumber = (state: RootState) => state.payment.billNumber;

export default paymentSlice;
