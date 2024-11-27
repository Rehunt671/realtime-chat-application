import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "libs/axios";
import { Room } from "types/room";

interface CreateRoomBody {
  name: string;
  createdBy: string;
}

export const useMutationCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createRoomBody: CreateRoomBody) => {
      const response = await axiosClient.post<Room>("/rooms", createRoomBody);
      return response.data;
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["user", variables.createdBy],
      });
    },
  });
};
export const useQueryGetRooms = () => {
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axiosClient.get<Room[]>(`/rooms`);
      return response.data;
    },
  });
};
