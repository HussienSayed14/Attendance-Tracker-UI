import { jwtDecode } from "jwt-decode";

export type JWTPayload = {
  exp: number;          // unix seconds
  [key: string]: any;   // anything else your payload carries
};

export const getToken = (): string | null =>
  localStorage.getItem("token");

export const isTokenValid = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JWTPayload>(token);
    return exp * 1000 > Date.now();          // still in the future?
  } catch {
    return false;                            // malformed token
  }
};