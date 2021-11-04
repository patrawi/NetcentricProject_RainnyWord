import React, { createContext, useState, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { User } from "../interfaces/User";
import { AppContext } from "./AppContext";

export interface SocketConstruct {
  socket: Socket | undefined;
  setSocket: (value: Socket | undefined) => void;
  socketOpen: boolean;
  setSocketOpen: (value: boolean) => void;
  updateLeaderboard: (user: User) => void;
  publicChat: (user: User, message: string) => void;
  updatePlayerList: () => void;
  lobbyTime : number | undefined
  gameTime: number | undefined;
  updateLobbyTime : () => void;
}
export const SocketContext = createContext({} as SocketConstruct);

const SocketContextProvider = ({ ...props }) => {
  const [socket, setSocket] = useState<Socket>();
  const [lobbyTime, setLobbyTime] = useState();
  const [gameTime, setGameTime] = useState<number>();
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const { setPlayers } = useContext(AppContext);

  useEffect(() => {
    updatePlayerList();
  }, []);

  const updatePlayerList = () => {
    if (socket) {
      socket.on("updatePlayerList", (updatePlayers: User[]) => {
        // console.log(updatePlayers);
        if (updatePlayers) setPlayers(updatePlayers);
      });
    }
  };

  const updateLeaderboard = (user: User) => {
    if (socket) socket.emit("updateLeaderboard", user);
  };

  const publicChat = (user: User, message: string) => {
    if (socket)
      socket.emit("publicChat", {
        name: user?.name,
        time: new Date(),
        message: message,
      });
  };
  const updateGameTime = () => {
    if(socket) {
      socket.on("getGameCountdown", (time : number) => {
        
        if (time != undefined) {
          console.log(time)
          setGameTime(time)
        }
      })
    }
  }

  const updateLobbyTime = () => {
    if(socket) {
      socket.on("getLobbyCountdown", (time : number) => {
        console.log(time)
        if (time != undefined) {
          setGameTime(time)
        }
      })
    }
  }
  const value = {
    socket,
    setSocket,
    socketOpen,
    setSocketOpen,
    updateLeaderboard,
    publicChat,
    updatePlayerList,
    lobbyTime,
    updateLobbyTime,
    gameTime,
  };
  return <SocketContext.Provider value={value} {...props} />;
};

export default SocketContextProvider;
