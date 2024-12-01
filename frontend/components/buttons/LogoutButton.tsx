import React from "react";
import { useAuth } from "hooks/useAuth";

interface LogoutButtonProps {
  text: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ text }) => {
  const { logout } = useAuth(); 

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-1 rounded-full shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5l7 7-7 7M6 12h14"
          />
        </svg>
        {text}
      </button>

    </>
  );
};

export default LogoutButton;
