import { useQuery } from "@tanstack/react-query";
import axiosClient from "libs/axios";
import { User } from "types/user";

export const useQueryGetUser = (username: string) => {
  return useQuery<User>({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await axiosClient.get(`/users`, {
        params: { username },
      });
      return response.data;
    },
  });
};
