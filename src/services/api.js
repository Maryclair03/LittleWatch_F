import Axios from "axios";
const http = Axios.create({
  baseURL: "http://192.168.1.13:8000/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default http;
