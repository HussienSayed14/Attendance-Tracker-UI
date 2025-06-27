// src/components/AuthGate.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenValid } from "@/lib/auth";

export default function AuthGate() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const ok = token && isTokenValid(token);

    navigate(ok ? "/home" : "/login", { replace: true });
  }, [navigate]);

  return null;   // renders nothing while redirecting
}