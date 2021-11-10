import React, { createContext, useState, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { User } from "../interfaces/User";
import { AppContext } from "./AppContext";
import { wordToRender } from "../types/type";
export interface SocketConstruct {
  socket: Socket | undefined;
  setSocket: (value: Socket | undefined) => void;
  socketOpen: boolean;
  setSocketOpen: (value: boolean) => void;
  updateLeaderboard: (user: User) => void;
  publicChat: (user: User, message: string) => void;
  updatePlayerList: () => void;
  updateLobbyTime: () => void;
  lobbyTime: number | undefined;
  words: wordToRender[];
  fetchWord: () => void;
}
export const SocketContext = createContext({} as SocketConstruct);

const SocketContextProvider = ({ ...props }) => {
  const [socket, setSocket] = useState<Socket>();
  const [lobbyTime, setLobbyTime] = useState<number>();
  const [socketOpen, setSocketOpen] = useState<boolean>(false);
  const [words, setWords] = useState<wordToRender[]>([]);
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
    console.log(user);
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

  const updateLobbyTime = () => {
    if (socket) {
      socket.on("getLobbyCountdown", (time: number) => {
        console.log(time);
        setLobbyTime(time);
      });
    }
  };

  const fetchWord = () => {
    if (socket) {
      socket.on("words", (randomwords: wordToRender[]) => {
        console.log(randomwords);
        setWords(randomwords);
      });
    }
  };
  const value = {
    socket,
    setSocket,
    socketOpen,
    setSocketOpen,
    updateLeaderboard,
    publicChat,
    updatePlayerList,
    updateLobbyTime,
    lobbyTime,
    words,
    fetchWord,
  };
  return <SocketContext.Provider value={value} {...props} />;
};

export default SocketContextProvider;
