// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage    from "./pages/Login";
import RegisterPage from "./pages/Register";
import SummaryPage  from "./pages/AttendanceSummary";
import PrivateRoute     from "./components/PrivateRoute";
import ProtectedLayout  from "./layouts/ProtectedLayout";
import CalendarPage from "./pages/Calendar";
import AuthGate from "./components/AuthGate";
import UserManagement from "./pages/UserManagement";
import Unauthorized from "./pages/Unauthorized";


export default function App() {
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<AuthGate />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected routes wrapper */}
      <Route element={<PrivateRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<SummaryPage />} />          
          <Route path="/calendar" element={<CalendarPage />} />  
          <Route path="/manage-users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}