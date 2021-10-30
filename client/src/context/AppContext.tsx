import React, { createContext, useState } from "react";
import { User } from "../interfaces/User";
import { Chat } from "./../interfaces/Chat";

export interface AppContextInterface {
  user: User;
  setUser: (user: User) => void;
  players: User[];
  setPlayers: (players: User[]) => void;
  pubChat: Chat[];
  setPubChat: (chat: Chat[]) => void;
  privChat: Chat[];
  setPrivChat: (chat: Chat[]) => void;
  onBgm: boolean;
  setOnBgm: (val: boolean) => void;
  onSfx: boolean;
  setOnSfx: (val: boolean) => void;
}

export const AppContext = createContext({} as AppContextInterface);
const AppContextProvider = ({ ...props }) => {
  const [user, setUser] = useState<User>({
    name: "Anonymous",
    id: "",
    score: 0,
    avatar: 0,
  });
  const [players, setPlayers] = useState<User[]>([]);
  const [privChat, setPrivChat] = useState<Chat[]>([]);
  const [pubChat, setPubChat] = useState<Chat[]>([]);
  const [onBgm, setOnBgm] = useState<boolean>(true);
  const [onSfx, setOnSfx] = useState<boolean>(true);
  const value = {
    user,
    setUser,
    players,
    setPlayers,
    pubChat,
    setPubChat,
    privChat,
    setPrivChat,
    onBgm,
    setOnBgm,
    onSfx,
    setOnSfx,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppContextProvider;
