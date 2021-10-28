import React, { createContext, useState, useContext } from "react";
import { Socket } from "socket.io-client";
import { User } from "../interfaces/User";
import { AppContext } from "./AppContext";

export interface SocketConstruct {
  socket: Socket | undefined;
  setSocket: (value: Socket | undefined) => void;
  socketOpen: boolean;
  setSocketOpen: (value: boolean) => void;
  addPlayer: (value: string) => void;
  updateLeaderboard: (user: User) => void;
  publicChat: (user: User, message: string) => void;
  playerList: User[] | undefined;
  updatePlayerlist: () => void;
}
export const SocketContext = createContext({} as SocketConstruct);

const SocketContextProvider = ({ ...props }) => {
  const [socket, setSocket] = useState<Socket>();
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [playerList, setPlayerlist] = useState<User[]>();

  const addPlayer = (name: string) => {
    if (socket) socket.emit("onAddPlayer", name);
  };

  const updatePlayerlist = () => {
    if (socket) {
      socket.on("updatePlayerlist", (updatePlayers) => {
        setPlayerlist(updatePlayers);
      });
    }
  };

  const updateLeaderboard = (user: User) => {
    if (socket) socket.emit("updateLeaderboard", user);
  };

  const updateLeaderboardEnd = () => {
    if (socket) {
      socket.on("updateLeaderboardEnd", () => {});
    }
  };

  const publicChat = (user: User, message: string) => {
    if (socket)
      socket.emit("publicChat", {
        name: user?.name,
        time: new Date(),
        message: message,
      });
  };

  const value = {
    socket,
    setSocket,
    socketOpen,
    setSocketOpen,
    addPlayer,
    updateLeaderboard,
    publicChat,
    playerList,
    updatePlayerlist,
  };
  return <SocketContext.Provider value={value} {...props} />;
};

export default SocketContextProvider;
