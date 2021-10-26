

// export const socket = SocketService();

import React, { createContext, useState } from 'react'
import { Socket } from 'socket.io-client'
import { io } from "socket.io-client" 

const  SocketService = () => {
    const socket = io("http://localhost:8000/", {
        withCredentials : true, 
        extraHeaders : {
          "rainy-word" : "abcd"
        }
      })
    return socket;

}


export interface SocketConstruct {
    socket: Socket | undefined
    setSocket: (value: Socket | undefined) => void
}

export const SocketContext = createContext({} as SocketConstruct)


const SocketContextProvider = ({ ...props }) => {
  const connectSocket = SocketService();
  const [socket, setSocket] = useState<Socket>(connectSocket);


  const value = {
    socket,
    setSocket,
    
  }
  return <SocketContext.Provider value={value} {...props} />
}

export default SocketContextProvider
