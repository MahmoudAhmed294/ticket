import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "api";
import axios from "axios";
import { LoginInput, Bill } from "./types";

export const getTickets = createAsyncThunk(
  "api/tickets",
  async (userName: string | number) => {
    const response = await Api({
      url: "/tickets",
      method: "POST",
      data: { userName },
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

export const getLogin = createAsyncThunk(
  "api/login",
  async (form: LoginInput) => {
    const response = await axios({
      url: "https://open-air-mall-proxy-server.vercel.app/api/FrontEnd/SignIn",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: form,
    })
      .then((res) => {
        if (res.data.name !== "Invlid user") {
          return res;
        }
      })
      .catch((res) => {
        return res;
      });

    return response?.data;
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
        console.log(err, "error");
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

export const PostBill = createAsyncThunk("api/payment", async (data: Bill) => {
  if (data) {
    const response = await Api({
      url: "bill",
      method: "post",
      data: data,
    });

    return response;
  }
});
