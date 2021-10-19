import { io, Socket } from "socket.io-client" 

export const  SocketService = () => {
    const socket = io("http://localhost:8000/", {
        withCredentials : true, 
        extraHeaders : {
          "rainy-word" : "abcd"
        }
      })
    return socket;

}