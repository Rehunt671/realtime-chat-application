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

  const onConnected = (stompClient: Stomp.Client) => {
    console.log("Web socket is connected");
    stompClient.subscribe("/topic/getUser", onGetUser);
    stompClient.subscribe("/topic/createRoom", onCreateRoom);
    stompClient.subscribe("/topic/deleteRoom", onDeleteRoom);
    dispatch(setWebSocketClient(stompClient));
    dispatch(setConnectionStatus(true));
  };

  const onGetUser = (payload: Stomp.Message) => {
    const userDatabase = JSON.parse(payload.body);
    const username = localStorage.getItem("username");
    dispatch(setUser(userDatabase[username]));
  };

  const onCreateRoom = (payload: Stomp.Message) => {
    const userDatabase = JSON.parse(payload.body);
    const username = localStorage.getItem("username");
    dispatch(setUser(userDatabase[username]));
  };

  const onDeleteRoom = (payload: Stomp.Message) => {
    const userDatabase = JSON.parse(payload.body);
    const username = localStorage.getItem("username");
    dispatch(setUser(userDatabase[username]));
  };

  return {
    connect,
    isConnected,
    sendMessage,
  };
};
