import React, { useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { SocketContext } from "../context/SocketContext";

interface SocketProp {}

const Socket: React.FC<SocketProp> = ({ children }: any) => {
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      const newSocket = socketIOClient("http://localhost:8000");
      setSocket(newSocket);
    } else {
      socket.on("connection", function () {
        console.log(socket.id);
      });
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [socket]);

  return <>{children}</>;
};

export default Socket;
