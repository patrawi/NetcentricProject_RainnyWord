import { Dispatch, SetStateAction } from "react";

export interface Chat {
  name: string;
  message: string;
  time: Date;
}

export interface ChatContextData {
  pubChat: Chat[] | undefined;
  setPubChat: Dispatch<SetStateAction<Chat[]>> | undefined;
  privChat: Chat[] | undefined;
  setPrivChat: Dispatch<SetStateAction<Chat[]>> | undefined;
}
