import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "api";
import { LoginInput, Bill } from "./types";

export const getLogin = createAsyncThunk(
  "api/login",
  async (form: LoginInput) => {
    const response = await Api({
      url: "/Login",
      method: "POST",
      data: form,
    })
      .then((res) => {
        return res;
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
          console.log(res);

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
          return res;
      })
      .catch((err) => {
        console.log(err);
      });

    return response?.data;
  }
});
export const getMember = createAsyncThunk(
  "api/member",
  async (memberID: string) => {
    if (memberID) {
      const response = await Api({
        url: `http://localhost:8080/api/member/${memberID}`,
        method: "get",
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      return response?.data;
    }
  }
);
export const getBillNumber = createAsyncThunk(
  "api/billNumber",
  async () => {
      const response = await Api({
        url: `http://localhost:8080/api/billNumber`,
        method: "get",
      })
        .then((res) => {
          
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      return response?.data;
    
  }
);

export const getBillNumberOfTicket = createAsyncThunk(
  "api/billNumberOfTicket",
  async () => {
      const response = await Api({
        url: `http://localhost:8080/api/ticketsNumber`,
        method: "get",
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      return response?.data;
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
export const postBalance = createAsyncThunk("api/addBalance", async (data:{ID:any , balance:number}) => {
  if (data) {
    const response = await Api({
      url: "chargeBalance",
      method: "post",
      data: data,
    });

    return response.data;
  }
});
