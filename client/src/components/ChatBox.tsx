import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Input, makeStyles } from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import { Chat } from "../interfaces/Chat";
import moment from "moment";
import { SocketContext } from "../context/SocketContext";

const ChatBox = () => {
  const { user, pubChat, setPubChat } = useContext(AppContext);
  const { socket, publicChat } = useContext(SocketContext);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on("onUpdatePublicChat", function (chats: Chat[]) {
        setPubChat(chats);
      });
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMessage(val);
  };

  const ChatMessage = () => {
    return (
      <div className={useStyle().chatMsg}>
        <div>
          {pubChat?.map((chat, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#9e9e9e" }}>
                    {moment(chat.time).format("h:mm:ss a")}
                  </span>
                </div>
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: 4,
                    color: "#455a64",
                  }}
                >
                  {chat.name}:
                </span>
                <span>{chat?.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleButtonClick = () => {
    if (user && message !== "" && socket) {
      publicChat(user, message);
      setMessage("");
    }
  };

  return (
    <div className={useStyle().container}>
      <Card style={{ padding: 20, backgroundColor: "#ffe082" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: "bold" }}>Chat</span>
        </div>
        <div className={useStyle().chatBox}>
          <ChatMessage />
        </div>
        <div>
          <Input
            placeholder="Enter Chat Message!"
            onChange={handleTextChange}
            value={message}
            style={{ width: "100%" }}
          />
          <Button
            variant="contained"
            onClick={handleButtonClick}
            className={useStyle().button}
          >
            SEND
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatBox;

const useStyle = makeStyles({
  container: {
    flex: 1,
    width: "23%",
    height: "100%",
  },
  chatBox: {
    flex: 1,
    overflowY: "scroll",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    height: "60vh",
    marginBottom: "1em",
    backgroundColor: "#fff",
    paddingLeft: 4,
  },
  button: {
    width: "100%",
    backgroundColor: "#ffca28",
    marginTop: 10,
  },
  chatMsg: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
