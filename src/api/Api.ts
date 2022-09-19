import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "api";
import { LoginInput , Bill } from "./types";

export const getLogin = createAsyncThunk(
  "api/login",
  async (form: LoginInput) => {
    const response = await Api({
      url: "/login",
      method: "POST",
      data: form,
    })
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
        return res;
      }
    })
    .catch((res) => {
      console.log(res);
      return res;
    });

  return response?.data;
});
export const logout = createAsyncThunk("api/logout", async () => {
  const response = await Api({
    url: "/logout",
    method: "get",
  })
    .then((res) => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch((res) => {
      return res;
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
export const getGateName = createAsyncThunk("api/gate", async (GateID: any) => {
  if (GateID) {
    const response = await Api({
      url: `/gates/${GateID}`,
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => {
        console.log(err , "error");
      });

    return response?.data;
  }
});
export const getCard = createAsyncThunk("api/card", async (CardID: string) => {
  if (CardID) {
    const response = await Api({
      url: `cards/${CardID}`,
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return response?.data;
  }
});
export const getMember = createAsyncThunk(
  "api/member",
  async (CardID: string) => {
    if (CardID) {
      const response = await Api({
        url: `members/${CardID}`,
        method: "get",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            return res;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return response?.data;
    }
  }
);

export const PostBill = createAsyncThunk(
  "api/payment",
  async (data: Bill) => {
    if (data) {
      const response = await Api({
        url: 'bill',
        method: "post",
        data:data
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return response;
    }
  }
);
