import { Dispatch, SetStateAction } from "react";

export interface Chat {
  name: string;
  message: string;
  time: Date;
}

export interface ChatContextData {
  pubChat: Chat[];
  setPubChat: Dispatch<SetStateAction<Chat[]>> | undefined;
}
