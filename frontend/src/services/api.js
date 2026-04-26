import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ✅ FIXED
export const analyzePet = (data) => API.post("/api/analyze/", data);

// (optional fix for history too)
//export const getHistory = () => API.get("/api/history/");
export const getHistory = () => API.get("/api/history/");
export default API;