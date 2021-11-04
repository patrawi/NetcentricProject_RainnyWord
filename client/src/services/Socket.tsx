import React, { useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { AppContext } from "../context/AppContext";
import { SocketContext } from "../context/SocketContext";
import { User } from "../interfaces/User";

interface SocketProp {}

const Socket: React.FC<SocketProp> = ({ children }: any) => {
  const { socket, setSocket } = useContext(SocketContext);
  const { setPlayers } = useContext(AppContext);
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIOClient("http://localhost:8000");
      setSocket(newSocket);
    } else {
      if (socket) {
        socket.emit("onRetrievePlayers");
        socket.on("retrievePlayers", function (players: User[]) {
          if (players) {
            setPlayers(players);
          }
        });
       
      }
      socket.on("connection", function () {
        console.log("Connected!");
      });

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      return () => {
        socket.off();
      };
    }
  }, [socket]);

  return <>{children}</>;
};

export default Socket;
