import axios from "axios";

const instance = axios.create({
  baseURL: "https://istrian-villa.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
