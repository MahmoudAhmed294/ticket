import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "api";
import { Bill } from "./types";



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


// export const getCard = createAsyncThunk("api/card", async (CardID: string) => {
//   if (CardID) {
//     const response = await Api({
//       url: `cards/${CardID}`,
//       method: "get",
//     })
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     return response?.data;
//   }
// });
// export const getMember = createAsyncThunk(
//   "api/member",
//   async (memberID: string) => {
//     if (memberID) {
//       const response = await Api({
//         url: `member/${memberID}`,
//         method: "get",
//       })
//         .then((res) => {
//           return res;
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//       return response?.data;
//     }
//   }
// );
export const getBillNumber = createAsyncThunk("api/billNumber", async () => {
  const response = await Api({
    url: `billNumber`,
    method: "get",
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  return response?.data;
});

export const getBillNumberOfTicket = createAsyncThunk(
  "api/billNumberOfTicket",
  async () => {
    const response = await Api({
      url: `ticketsNumber`,
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
export const postBalance = createAsyncThunk(
  "api/addBalance",
  async (data: { ID: any; balance: number; userName:any; }) => {
    if (data) {
      const response = await Api({
        url: "chargeBalance",
        method: "post",
        data: data,
      });

      return response.data;
    }
  }
);
