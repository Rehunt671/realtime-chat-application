import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  selectWebsocket,
  setConnectionStatus,
  setWebSocketClient,
} from "stores/slices/websocketSlice";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const { client, isConnected } = useSelector(selectWebsocket);

  const subscribeToTopic = useCallback(
    (topic: string, callback: (message: string) => void) => {
      if (client && isConnected) {
        const subscription = client.subscribe(topic, (frame) => {
          const message = frame.body;
          callback(message);
        });

        return subscription;
      }
    },
    [client, isConnected]
  );

  useEffect(() => {
    if (!client) {
      const socket = new SockJS("/ws"); // WebSocket endpoint
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        console.log("WebSocket connected");
        dispatch(setWebSocketClient(stompClient));
        dispatch(setConnectionStatus(true));
      });

      return () => {
        if (stompClient.connected) {
          stompClient.disconnect(() => {
            console.log("WebSocket disconnected");
            dispatch(setConnectionStatus(false));
          });
        }
      };
    }
  }, [client, dispatch]);

  const sendMessage = (destination: string, message: string) => {
    if (client && isConnected) {
      client.send(destination, {}, message);
    }
  };

  return {
    client,
    isConnected,
    sendMessage,
    subscribeToTopic,
  };
};
