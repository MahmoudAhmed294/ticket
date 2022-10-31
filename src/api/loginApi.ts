import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse, ticket } from "./types";
import { getBaseUrl } from "./Url";


export const LoginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      { userName: string; password: string }
    >({
      query: (payload) => ({
        url: "/Login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (
        { isAdmin, tickets, token, userName, GateID }: any,
        meta
      ) => {
        const newTickets = tickets.map((ticket: ticket) => ({
          ...ticket,
          quantity: 1,
        }));
        return {
          token,
          tickets: newTickets,
          isAdmin,
          userName,
          GateID,
        };
      },
    }),
    checkToken: builder.query<LoginResponse, any>({
      query: (token) => ({
        url: "/checkToken",
        method: "Get",
        headers: {
          authorization: `${token}`,
        },
      }),
      transformResponse: (
        { isAdmin, tickets, token, userName, GateID }: any,
        meta
      ) => {
        const newTickets = tickets.map((ticket: ticket) => ({
          ...ticket,
          quantity: 1,
        }));
        return {
          token,
          tickets: newTickets,
          isAdmin,
          userName,
          GateID,
        };
      },
    }),
    getGateName: builder.query<object, any>({
      query: (GateID) => ({
        url: `gates/${GateID}`,
        method: "get",
      }),
    }),
  }),
});

export const { useLoginMutation, useCheckTokenQuery, useGetGateNameQuery } =
  LoginApi;
