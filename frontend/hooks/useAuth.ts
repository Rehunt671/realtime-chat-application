import { useDispatch } from "react-redux";
import { setUser } from "stores/slices/userSlice";
import { useMutationLogin } from "api/auth";
import { useRouter } from "next/navigation";
import { useWebSocket } from "hooks/useWebsocket";

export const useAuth = () => {
  const { connect } = useWebSocket();
  const dispatch = useDispatch();
  const router = useRouter();
  const loginMutation = useMutationLogin();

  const login = async (username: string) => {
    const authBody = { username };
    try {
      const user = await loginMutation.mutateAsync(authBody);

      dispatch(setUser(user));

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);

      connect(username);

      router.push("/dashboard");

      return user;
    } catch (error) {
      throw new Error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return { login, logout };
};
