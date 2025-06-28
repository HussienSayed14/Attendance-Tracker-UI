// src/pages/Unauthorized.tsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/home"
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}