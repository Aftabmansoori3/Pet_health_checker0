import axios from "axios";

const API = axios.create({
  baseURL: "https://pet-health-checker45.onrender.com",
});

export const analyzePet = (data) => API.post("/analyze", data);
export const getHistory = () => API.get("/history");

export default API;