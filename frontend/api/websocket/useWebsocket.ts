import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs"; // Add Stomp types
import {
  selectWebsocket,
  setConnectionStatus,
  setWebSocketClient,
} from "stores/slices/websocketSlice";
import { setUser } from "stores/slices/userSlice";
import { useAppSelector } from "stores/hook";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const { client, isConnected } = useAppSelector(selectWebsocket);
  const serverUrl = process.env.API_BASE_URL;

  const sendMessage = (destination: string, message) => {
    if (client && isConnected) {
      console.log("send", {...message});
      client.send(`/app${destination}`, {}, JSON.stringify(message));
    }
  };

  const connect = () => {
    try {
      const socket = new SockJS(`${serverUrl}/ws`);
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => onConnected(stompClient));
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

  const onConnected = (stompClient: Stomp.Client) => {
    console.log("Web socket is connected");
    const username = localStorage.getItem("username");
    stompClient.subscribe(`/user/${username}/topic/getMe`, onGetMe);
    stompClient.subscribe(`/user/${username}/topic/createRoom`, onCreateRoom);
    stompClient.subscribe("/topic/deleteRoom", onDeleteRoom);
    dispatch(setWebSocketClient(stompClient));
    dispatch(setConnectionStatus(true));
  };

  const onGetMe = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    console.log(user)
    dispatch(setUser(user));
  };

  const onCreateRoom = (payload: Stomp.Message) => {
    const user = JSON.parse(payload.body);
    console.log(user)
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
