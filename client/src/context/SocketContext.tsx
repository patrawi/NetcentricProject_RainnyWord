import React, { createContext, useState } from 'react'
import { Socket, io} from 'socket.io-client';
import { Chat } from '../interfaces/Chat';
import {User} from '../interfaces/User'

export interface SocketConstruct {
    socket: Socket | undefined
    setSocket: (value: Socket | undefined) => void
    socketOpen : boolean
    setSocketOpen : (value : boolean) => void
    addPlayer  : (value  : string) => void;
    updateLeaderboard: (user: User) => void;
    publicChat : (user: User, message: string) => void
    playerList : User[] | undefined ;
    updatePlayerlist : () => void

}
export const SocketContext = createContext({} as SocketConstruct)

const SocketContextProvider = ({ ...props }) => {
  const [socket, setSocket] = useState<Socket>()
  const [socketOpen, setSocketOpen] = useState<boolean>(false)
  const [playerList, setPlayerlist] = useState<User[]>()
  const addPlayer  =  (name:  string ) => {
    if(socket) socket.emit("onAddPlayer", name);
    
  };
  const updateLeaderboard = (user: User) => {
    console.log(user);
    if(socket)  socket.emit("updateLeaderboard", { id: user.id, score: user.score });
  }

  const publicChat = (user: User, message: string) => {
    if(socket) socket.emit("publicChat", {
      name: user?.name,
      time: new Date(),
      message: message,
    });
  }
  const updatePlayerlist = () => {
    if(socket) {
      const players = socket.on("updatePlayerlist", (updatePlayers) => {
        setPlayerlist(updatePlayers);
        console.log(playerList);
    })
    console.log(players);
    }

   const updateLeaderboardEnd = () => {
     if(socket) {
      socket.on("updateLeaderboardEnd", () => {
        
      });
     }
   }

  }
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
}
  return <SocketContext.Provider value={value} {...props} />
}

export default SocketContextProvider;