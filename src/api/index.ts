import axios from "axios";

const Api = axios.create({
  baseURL: "https://tk-api-backend.herokuapp.com",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default Api;
