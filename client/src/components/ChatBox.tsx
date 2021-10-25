import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Switch, Input } from "@material-ui/core";
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
      setPubChat([...pubChat, chat]);
    });
    socket.on("privateChat", function (targetSocket, chat: Chat) {
      setPrivChat([...privChat, chat]);
    });
  }, [pubChat, setPubChat, privChat, setPrivChat, user]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMessage(val);
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
      <Card style={{ padding: 20, backgroundColor: "#ffe082" }}>
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
        <div className={useStyle().chatBox}>
          <ChatMessage />
        </div>
        <div>
          <Input
            placeholder={
              chatMode ? "Public chat message" : "Private chat message"
            }
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

const useStyle = makeStyles((theme) => ({
  chatBox: {
    flex: 1,
    overflowY: "scroll",
    height: "45vh",
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
}));
