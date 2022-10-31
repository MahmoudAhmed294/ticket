import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  PostBill } from "api/Api";
import { ticket , LoginResponse } from "api/types";
import { RootState } from "./store";

export interface TicketsState {
  status: "idle" | "loading" | "failed";
  Summary: ticket[];
  total: number;
  Tax: number;
  gate: string;
  user: string | undefined;
  isAdmin: boolean;
  validate: any;
  tickets: ticket[];
  GateID: number | undefined;
}

const initialState: TicketsState = {
  status: "failed",
  Summary: [],
  total: 0,
  Tax: 0,
  isAdmin: false,
  gate: "",
  user: undefined,
  tickets: [],
  validate: undefined,
  GateID: undefined,
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {
    addTicketToSummary: (state, action: PayloadAction<any>) => {
      if (!state.Summary.some((value) => value.ID === action.payload.id)) {
        state.Summary = [
          ...state.Summary,
          ...state.tickets.filter((item: any) => item.ID === action.payload.id),
        ];
      } else {
        state.Summary = state.Summary.map((ticket: any) =>
          ticket.ID === action.payload.id
            ? { ...ticket, quantity: (ticket.quantity += 1) }
            : ticket
        );
      }

      if (state.Summary.length !== 0) {
        const totalForItemQuantity = state.Summary.map(
          ({ Amount, quantity }) => quantity * Amount
        );
        const totalForItemTax = state.Summary.map(
          ({ Tax, quantity }) => quantity * Tax
        );

        const totalAmount = totalForItemQuantity.reduce(
          (total, num) => total + num
        );
        state.Tax = totalForItemTax.reduce((total, num) => total + num);

        state.total = totalAmount - state.Tax;
      } else {
        state.total = 0;
        state.Tax = 0;
      }
    },
    deleteTicketFromSummary: (state, action: PayloadAction<any>) => {
      state.Summary = state.Summary.map((ticket: any) =>
        ticket.ID === action.payload
          ? { ...ticket, quantity: (ticket.quantity -= 1) }
          : ticket
      );

      if (state.Summary.length !== 0) {
        const totalForItemQuantity = state.Summary.map(
          ({ Amount, quantity }) => quantity * Amount
        );
        
        const totalForItemTax = state.Summary.map(
          ({ Tax, quantity }) => quantity * Tax
          );
          
          const totalAmount = totalForItemQuantity.reduce(
            (total, num) => total + num
            );
            const totalTax = totalForItemTax.reduce((total, num) => total + num);
            
        state.Tax = totalTax;

        state.total = totalAmount - totalTax;
      } else {
        state.total = 0;
        state.Tax = 0;
      }
    },
    resetAll: (state) => {
      state.Summary = [];
      state.gate = "";
      state.user = undefined;
      state.tickets = [];
    },

    addUser:(state , action: PayloadAction<LoginResponse> ) =>{
      state.user = action.payload.userName;
      state.GateID = action.payload.GateID;
      state.tickets = action.payload.tickets;
      state.isAdmin = action.payload.isAdmin;

    },
    addGateName:(state , action: PayloadAction<any>)=>{
      state.gate = action.payload?.Name;

    }
  },
  extraReducers: (builder) => {


    builder.addCase(PostBill.fulfilled, (state, action) => {
      state.Summary = [];
      state.total = 0;
      state.Tax = 0;
    });
  },
});

export const { addTicketToSummary, deleteTicketFromSummary, resetAll ,addUser ,addGateName } =
  ticketsSlice.actions;

export const getUser = (state: RootState) => state.tickets.user;
export const getSummary = (state: RootState) => state.tickets.Summary;
export const getTotal = (state: RootState) => state.tickets.total;
export const getTax = (state: RootState) => state.tickets.Tax;
export const getStatus = (state: RootState) => state.tickets.status;
export const getAllTickets = (state: RootState) => state.tickets.tickets;
export const getGateID = (state: RootState) => state.tickets.GateID;
export const getGate = (state: RootState) => state.tickets.gate;
export const getValidate = (state: RootState) => state.tickets.validate;
export const getIsAdmin = (state: RootState) => state.tickets.isAdmin;

export default ticketsSlice;
