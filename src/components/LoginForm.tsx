import { useState } from "react";
import { login } from "../services/auth";
import type { LoginForm as LoginFormType }  from "../types/User";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export function LoginForm() {
  const [form, setForm] = useState<LoginFormType>({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // clear previous error
    try {
      const res = await login(form);              // <-- call service
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("name", res.name);
      navigate("/home");                              // redirect on success
    } catch (err) {
      // err is the Error we threw from the service
      setError((err as Error).message);
      toast.error((err as Error).message);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}