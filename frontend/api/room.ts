import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "libs/axios";
import { Room } from "types/room";

export interface CreateRoomBody {
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

export const useMutationDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomId: number) => {
      const response = await axiosClient.delete<Room>(`/rooms/${roomId}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
