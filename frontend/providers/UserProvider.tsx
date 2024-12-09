import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWebSocket } from "api/websocket/useWebsocket";
import LoadingSpinner from "@/components/LoadingSpinner";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { connect, isConnected, sendMessage } = useWebSocket();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (!storedUsername) {
      router.push("/login");
    } else {
      connect(storedUsername);
      // router.push("/dashboard"); // on production uncomment this line
    }
  }, [router]);

  useEffect(() => {
    if (isConnected && username) {
      sendMessage("/getMe", username);
    }
  }, [isConnected]);

  return <>{children}</>;
};

export default UserProvider;
