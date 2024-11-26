import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "types/user";

interface LoginData {
  username: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData: LoginData) => {
      const response = await axios.post<User>(
        "http://localhost:8080/users/login",
        {
          loginData,
        }
      );
      return response;
    },
  });
};
