import { useMutation } from "@tanstack/react-query";
import axiosClient from "libs/axios";
import { User } from "types/user";

interface AuthBody {
  username: string;
}

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: async (authBody: AuthBody) => {
      const response = await axiosClient.post<User>("/auth/login", authBody);
      return response.data;
    },
  });
};
