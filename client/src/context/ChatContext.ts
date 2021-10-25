import { createContext } from "react";
import { ChatContextData } from "../interfaces/Chat";

export const ChatContext = createContext<ChatContextData>({
  privChat: undefined,
  setPrivChat: undefined,
  pubChat: undefined,
  setPubChat: undefined,
});
