import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore"; 
import defaultAvatar from "../assets/default-avatar.png";
import moonAvatar from "../assets/moon.jpg"
import calendarIcon from "../assets/icons-calendar.png";
import { useState } from "react";

export default function Navbar() {
  const name = authStore((s) => s.name);
  const email = authStore((s) => s.email);  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const permissions = authStore((s) => s.permissions);
  const hasAccessManagement = permissions.includes("can_manage_access");

  const handleLogout = () => {
    authStore.getState().logout(); // Clear global auth state
    localStorage.removeItem("token"); 
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={calendarIcon}
            className="h-12"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Attendance Tracker
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <img
              className="w-12 h-12 rounded-full"
              src={moonAvatar}
              alt="User avatar"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-16 right-4 z-50 w-48 text-base bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="px-4 py-3">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">{name}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/home"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calendar"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    Calendar
                  </Link>
                </li>
                {hasAccessManagement && (
                      <li>
                        <Link
                          to="/manage-users"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                        >
                          Access Management
                        </Link>
                      </li>
                    )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}