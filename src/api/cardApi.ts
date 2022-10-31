import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse, ticket } from "./types";
import { getBaseUrl } from "./Url";

export const CardApi = createApi({
  reducerPath: "card",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getCard: builder.mutation<any, any>({
      query: (CardID) => ({
        url: `cards/${CardID}`,
        method: "get",
      }),
    }),
    addBalance: builder.mutation<
      any,
      { ID: any; balance: number; userName: any }
    >({
      query: (data) => ({
        url: `chargeBalance`,
        method: "Post",
        body: data,
      }),
    }),
  }),
});

export const { useGetCardMutation, useAddBalanceMutation } = CardApi;
