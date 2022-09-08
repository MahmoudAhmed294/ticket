
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ticketsData} from  "data/ticket";
import { getToPathname } from "react-router/lib/router";

import { RootState } from "./store";

interface ticket {
id:number;
title:string;
price:number
}
export interface TicketsState {
    Summary:ticket[]
    total:number
}

const initialState: TicketsState = {
    Summary:[],
    total:0
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  reducers: {
    addTicketToSummary:(state, action: PayloadAction<number>)=> {
        const summaryItem = ticketsData.filter(({id})=> id === action.payload)
         state.Summary.push(...summaryItem)
         state.total = state.Summary.map(({price})=>price).reduce((total, num) => total + num)
        
    },
  },
});

export const { addTicketToSummary } = ticketsSlice.actions;

export const getSummary = (state: RootState) => state.tickets.Summary;
export const getTotal = (state: RootState) => state.tickets.total;

export default ticketsSlice.reducer;
