import axios from "axios";

export const API_URL = import.meta.env.MODE==="development"?"http://localhost:5001":"/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
