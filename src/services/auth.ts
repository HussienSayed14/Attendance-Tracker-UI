import axios from "./api";
import { AxiosError } from "axios";
import type { RegisterForm, LoginForm, LoginResponse } from "../types/User";

export const registerUser = async (data: RegisterForm) => {
  const response = await axios.post("/auth/register", data);
  // console.log("Registration response:", response.data);
  return response.data;
};


export const login = async (data: LoginForm): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>("/auth/login", data);
    // console.log("Login response:", res.data);
    return res.data; // success
  } catch (err) {
    // AxiosError typed so we can access response safely
    const error = err as AxiosError<{ detail: string }>;
    console.error("Login error:", error.response?.data);

    // Re-throw a clean, app-friendly error
    throw new Error(
      error.response?.data.detail || "Unknown error, please try again."
    );
  }
};