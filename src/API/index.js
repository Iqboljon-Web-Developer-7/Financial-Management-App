import axios from "axios";

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
export const axiosFun = axios.create({
  baseURL: API_URL,
});
