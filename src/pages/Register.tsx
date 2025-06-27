import { useState } from "react";
import { toast } from "sonner"; // ✅ import toast
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../services/auth";
import type { RegisterForm } from "../types/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const navigate = useNavigate();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await registerUser(form);
    toast.success("Registered successfully!");

    
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

  } catch (err) {
    const message =
      axios.isAxiosError(err) && err.response?.data?.detail
        ? err.response.data.detail
        : (err as Error).message || "Unexpected error";

    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

        {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">Login</a>
        </div>
      </form>
    </div>
  );
}