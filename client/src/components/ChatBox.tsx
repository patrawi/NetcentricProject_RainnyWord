import React, { useState, useContext, useEffect } from "react";
import { CardContent, Card, Button, Switch, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { socket } from "../services/Socket";
import { AppContext } from "../context/AppContext";
import { Chat } from "../interfaces/Chat";
import moment from "moment";

const ChatBox = () => {
  const { user, pubChat, setPubChat, privChat, setPrivChat } =
    useContext(AppContext);
  const [chatMode, setChatMode] = useState(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("publicChat", function (chat: Chat) {
      const newPubChat = pubChat;
      newPubChat.push(chat);
      setPubChat(newPubChat);
    });
    socket.on("privateChat", function (targetSocket, chat: Chat) {
      const newPubChat = pubChat;
      newPubChat.push(chat);
      setPubChat(newPubChat);
    });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val && setPubChat && setPrivChat) {
      setMessage(val);
    }
  };

  const ChatMessage = () => {
    return (
      <div className={useStyle().chatMsg}>
        {chatMode ? (
          <div>
            {pubChat?.map((chat, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 12 }}>
                      {moment(chat.time).format("h:mm:ss a")}
                    </span>
                  </div>
                  <span style={{ fontWeight: "bold", marginRight: 4 }}>
                    {chat.name}:
                  </span>
                  <span>{chat?.message}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {privChat?.map((chat, index) => {
              return (
                <div key={index}>
                  <div>
                    <p>{chat.name}</p>
                    <p>{chat?.time.toLocaleString()}</p>
                  </div>
                  <p>{chat?.message}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleButtonClick = async () => {
    if (user && message !== "") {
      if (chatMode === true) {
        socket.emit("publicChat", {
          name: user?.name,
          time: new Date(),
          message: message,
        });
      } else {
        socket.emit("privateChat", {
          name: user?.name,
          time: new Date(),
          message: message,
        });
      }
      setMessage("");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        bottom: 100,
        width: "20%",
        flex: 1,
      }}
    >
      <Card style={{ padding: 20, backgroundColor: "#8aacc8" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Chat Mode</span>
          <Switch onChange={() => setChatMode(!chatMode)} />
        </div>
        <span>{chatMode ? "Public Chat" : "Private Chat"}</span>
        <CardContent className={useStyle().chatBox}>
          <ChatMessage />
        </CardContent>
        <div>
          <Input
            placeholder={
              chatMode ? "Public chat message" : "Private chat message"
            }
            onChange={handleTextChange}
            value={message}
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

const useStyle = makeStyles((theme) => ({
  chatBox: {
    flex: 1,
    overflowY: "scroll",
    height: "45vh",
  },
  button: {
    width: "90%",
  },
  chatMsg: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
}));
