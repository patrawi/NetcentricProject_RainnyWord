import React, { createContext, useState } from "react";
import { User } from "../interfaces/User";
import { Chat } from "./../interfaces/Chat";

export interface AppContextInterface {
  user: User;
  setUser: (user: User) => void;
  pubChat: Chat[];
  setPubChat: (chat: Chat[]) => void;
  privChat: Chat[];
  setPrivChat: (chat: Chat[]) => void;
}

export const AppContext = createContext({} as AppContextInterface);
const AppContextProvider = ({ ...props }) => {
  const [user, setUser] = useState<User>({
    name: "Anonymous",
    id: "",
    score: 0,
  });
  const [privChat, setPrivChat] = useState<Chat[]>([]);
  const [pubChat, setPubChat] = useState<Chat[]>([]);
  const value = { user, setUser, pubChat, setPubChat, privChat, setPrivChat };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppContextProvider;
