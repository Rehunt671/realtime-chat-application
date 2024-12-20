import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  selectWebsocket,
  setConnectionStatus,
  setWebSocketClient,
} from "stores/slices/webSocketSlice";
import { setUser } from "stores/slices/userSlice";
import { useAppSelector } from "stores/hook";
import { redirect } from "next/navigation";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const { client, isConnected } = useAppSelector(selectWebsocket);
  const serverUrl = process.env.API_BASE_URL;

  const sendMessage = (destination: string, message) => {
    if (client && isConnected) {
      console.log("send", { ...message });
      client.send(`/app${destination}`, {}, JSON.stringify(message));
    }
  };

  const connect = (username: string) => {
    try {
      const socket = new SockJS(`${serverUrl}/ws`);
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => onConnected(stompClient, username));
      stompClient.debug = () => {};
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = () => {
    if (client && isConnected) {
      client.disconnect(() => {
        console.log("WebSocket disconnected");
        dispatch(setConnectionStatus(false));
        dispatch(setWebSocketClient(null));
      });
    } else {
      console.log("No active WebSocket connection to disconnect.");
    }
  };

  const onConnected = (stompClient: Stomp.Client, username: string) => {
    console.log("Web socket is connected");
    stompClient.subscribe(`/user/${username}/topic/login`, onLogin);
    stompClient.subscribe(`/user/${username}/topic/getMe`, onGetMe);
    stompClient.subscribe(`/user/${username}/topic/updateUser`, onUpdateUser);
    stompClient.subscribe(`/user/${username}/topic/createRoom`, onCreateRoom);
    stompClient.subscribe(`/user/${username}/topic/enterRoom`, onEnterRoom);
    stompClient.subscribe(`/user/${username}/topic/joinRoom`, onJoinRoom);
    stompClient.subscribe(`/user/${username}/topic/leaveRoom`, onLeaveRoom);
    stompClient.subscribe(`/user/${username}/topic/exitRoom`, onExitRoom);
    stompClient.subscribe("/topic/deleteRoom", onDeleteRoom);
    dispatch(setWebSocketClient(stompClient));
    dispatch(setConnectionStatus(true));
  };

  const onGetMe = (payload: Stomp.Message) => {
    try {
      const response = JSON.parse(payload.body);

      if (response.error) {
        console.warn(response.error);
        redirect("/login");
      }

      dispatch(setUser(response));
    } catch (error) {
      console.error("Failed to parse payload body:", error);
      redirect("/login");
    }
  };

  const onLogin = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user);

    redirect("/dashboard");
  };

  const onCreateRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
  };

  const onExitRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
  };

  const onUpdateUser = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
  };

  const onJoinRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
    redirect(`/room/${user.currentRoom.id}`);
  };

  const onLeaveRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
    redirect(`/dashboard`);
  };

  const onEnterRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    dispatch(setUser(user));
  };

  const onDeleteRoom = (payload: Stomp.Message) => {
    const userDatabase = JSON.parse(payload.body);
    const username = localStorage.getItem("username");
    dispatch(setUser(userDatabase[username]));
  };

  return {
    connect,
    disconnect,
    isConnected,
    sendMessage,
  };
};
