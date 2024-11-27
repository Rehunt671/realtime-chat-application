"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "stores/slices/userSlice";
import { useMutationLogin } from "api/auth";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const loginMutation = useMutationLogin();
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Username is required!");
    } else {
      setError("");
      const authBody = { username };
      const user = await loginMutation.mutateAsync(authBody);
      dispatch(setUser(user));
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please enter your username to continue
        </p>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
