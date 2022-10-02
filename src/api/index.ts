import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "https://tk-api-backend.herokuapp.com/api";
      break;
    case "development":
    default:
      url = "http://localhost:8080/api";
  }

  return url;
};

const Api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "authorization",
  },
  timeout: 15000,
});

export default Api;
