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


export const socket = SocketService();