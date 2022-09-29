import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkToken, getLogin, getGateName, PostBill } from "api/Api";
import { ticket } from "api/types";
import { RootState } from "./store";

export interface TicketsState {
  status: "idle" | "loading" | "failed";
  Summary: ticket[];
  total: number;
  Tax: number;
  gate: string;
  user: string | undefined;
  validate: any;
  tickets: [];
  GateID: number | undefined;
}

const initialState: TicketsState = {
  status: "failed",
  Summary: [],
  total: 0,
  Tax: 0,
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
        const totalQuantity = state.Summary.map(
          ({ quantity }) => quantity
        ).reduce((total, num) => total + num);
        const totalAmount = state.Summary.map(
          ({ Amount, quantity }) => Amount
        ).reduce((total, num) => total + num);
        state.Tax = state.Summary.map(({ Tax }) => Tax).reduce(
          (total, num) => total + num
        );
        state.total = (totalAmount - state.Tax) * totalQuantity;
      } else {
        state.total = 0;
      }
    },
    deleteTicketFromSummary: (state, action: PayloadAction<number>) => {
      state.Summary = state.Summary.filter(
        (value, index) => value.ID !== action.payload
      );

      if (state.Summary.length !== 0) {
        const totalQuantity = state.Summary.map(
          ({ quantity }) => quantity
        ).reduce((total, num) => total + num);

        const totalAmount = state.Summary.map(({ Amount }) => Amount).reduce(
          (total, num) => total + num
        );
        state.Tax = state.Summary.map(({ Tax }) => Tax).reduce(
          (total, num) => total + num
        );
        state.total = (totalAmount - state.Tax) * totalQuantity;
      } else {
        state.total = 0;
      }
    },
    resetAll: (state) => {
      state.Summary = [];
      state.gate = "";
      state.user = undefined;
      state.tickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload?.userName;
        state.GateID = action.payload?.GateID;
        const addQuantity = action.payload?.tickets.map((ticket: any) => ({
          ...ticket,
          quantity: 1,
        }));
        state.tickets = addQuantity;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.status = "failed";
        state.validate = action.payload;
      });

    builder
      .addCase(checkToken.pending, (state) => {
        state.status = "loading";
      })

      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = "idle";

        state.user = action.payload?.userName;
        state.GateID = action.payload?.GateID;
        const addQuantity = action.payload?.tickets.map((ticket: any) => ({
          ...ticket,
          quantity: 1,
        }));
        state.tickets = addQuantity;
      })
      .addCase(checkToken.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(getGateName.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getGateName.fulfilled, (state, action) => {
        state.status = "idle";
        state.gate = action.payload?.Name;
      })
      .addCase(getGateName.rejected, (state) => {
        state.status = "failed";
      });
    builder.addCase(PostBill.fulfilled, (state, action) => {
      state.Summary = [];
      state.total = 0;
      state.Tax = 0;
    });
  },
});

export const { addTicketToSummary, deleteTicketFromSummary, resetAll } =
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

export default ticketsSlice.reducer;
