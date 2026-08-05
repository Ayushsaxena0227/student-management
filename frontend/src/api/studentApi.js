import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getStudents = (search = "") =>
  api.get(`/students${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const createStudent = (data) => api.post("/students", data);

export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

export const deleteStudent = (id) => api.delete(`/students/${id}`);
