import axios from "axios";

export const http = axios.create({
  baseURL: "https://meddata-backend.onrender.com",
  timeout: 12000,
});

export const getStates  = () => http.get("/states");
export const getCities  = (state) => http.get(`/cities/${encodeURIComponent(state)}`);
export const getCenters = (state, city) =>
  http.get("/data", { params: { state, city } });