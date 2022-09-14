import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "api";

import { ticket, LoginResponse, LoginInput } from "api/types";

import { RootState } from "./store";

export interface TicketsState {
  status: "idle" | "loading" | "failed";
  Summary: ticket[];
  total: number;
  Tax: number;
  gate: string;
  user: LoginResponse | undefined;
  tickets: [];
}

const initialState: TicketsState = {
  status: "failed",
  Summary: [],
  total: 0,
  Tax: 0,
  gate: "",
  user: undefined,
  tickets: [],
};

export const getLogin = createAsyncThunk(
  "api/login",
  async (form: LoginInput) => {
    const response = await Api({
      url: "/login",
      method: "POST",
      data: form,
    });

    return response.data;
  }
);
export const checkToken = createAsyncThunk("api/checkToken", async () => {
  const response = await Api({
    url: "/checkToken",
    method: "get",
  })
    .then((res) => {
      if (res.status === 200) {
        getTickets(res.data.GateID);
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return response?.data;
});

export const getTickets = createAsyncThunk(
  "api/tickets",
  async (GateID: string | number) => {
    const response = await Api({
      url: "/tickets",
      method: "POST",
      data: { GateID },
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return response?.data;
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {
    addTicketToSummary: (state, action: PayloadAction<number>) => {
      const summaryItem = state.tickets.filter(
        ({ ID }) => ID === action.payload
      );
      state.Summary.push(...summaryItem);
      state.total = state.Summary.map(({ Amount }) => Amount).reduce(
        (total, num) => total + num
      );
    },
    deleteTicketFromSummary: (state, action: PayloadAction<number>) => {
      state.Summary = state.Summary.filter(
        (_, index) => index !== action.payload
      );

      if (state.Summary.length !== 0) {
        const totalAmount = state.Summary.map(({ Amount }) => Amount).reduce(
          (total, num) => total + num
        );
        state.Tax = state.Summary.map(({ Tax }) => Tax).reduce(
          (total, num) => total + num
        );
        state.total = totalAmount - state.Tax;
      }
      else{
        state.total = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets = action.payload?.tickets;
        state.user = { ...action.payload?.user };
      })
      .addCase(getLogin.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(checkToken.pending, (state) => {
        state.status = "loading";
      })

      .addCase(checkToken.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(checkToken.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getTickets.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets = action.payload?.tickets;
      })
      .addCase(getTickets.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addTicketToSummary, deleteTicketFromSummary } =
  ticketsSlice.actions;

export const getUser = (state: RootState) => state.tickets.user;
export const getSummary = (state: RootState) => state.tickets.Summary;
export const getTotal = (state: RootState) => state.tickets.total;
export const getTax = (state: RootState) => state.tickets.Tax;
export const getStatus = (state: RootState) => state.tickets.status;
export const getAllTickets = (state: RootState) => state.tickets.tickets;

export default ticketsSlice.reducer;
