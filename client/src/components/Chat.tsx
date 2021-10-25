import React, { useState, useContext, useEffect } from "react";
import {
  CardContent,
  Card,
  Button,
  Switch,
  Input,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { socket } from "../services/Socket";
import { AppContext } from "./../context/AppContext";

const Chat = () => {
  const { user, pubChat, setPubChat, privChat, setPrivChat } =
    useContext(AppContext);
  const [chatMode, setChatMode] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {}, [setPrivChat, setPubChat]);
  const renderChat = () => {
    if (chatMode === true) {
      //Public Chat
      return (
        <div>
          {pubChat?.map((chat, index) => {
            return (
              <div key={index}>
                <p>{chat?.time.toLocaleString()}</p>
                <p>{chat?.message}</p>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Private Chat
      <div>
        {privChat?.map((chat, index) => {
          return (
            <div key={index}>
              <p>{chat?.time.toLocaleString()}</p>
              <p>{chat?.message}</p>
            </div>
          );
        })}
      </div>;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val && setPubChat && setPrivChat) {
      setMessage(val);
    }
  };
  const handleButtonClick = () => {
    if (user) {
      if (chatMode === true) {
        const newChat = pubChat;
        newChat.push({
          name: user?.name,
          message: message,
          time: new Date(),
        });

        setPubChat(newChat);
        setMessage("");
        // socket.emit()
      } else {
        const newChat = privChat;
        newChat.push({
          name: user.name,
          message: message,
          time: new Date(),
        });
        setPrivChat(newChat);
        setMessage("");
      }
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
        <p>Chat Mode</p>
        <Switch onChange={() => setChatMode(!chatMode)} />
        <Typography variant="h6">
          {chatMode ? "Public Chat" : "Private Chat"}
        </Typography>
        <CardContent className={useStyle().chatBox}>
          <div>{renderChat()}</div>
        </CardContent>
        <div>
          <Input
            placeholder={
              chatMode ? "Public chat message" : "Private chat message"
            }
            onChange={handleTextChange}
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

export default Chat;

const useStyle = makeStyles((theme) => ({
  chatBox: {
    flex: 1,
    width: "20vw",
    height: "45vh",
    overflowY: "scroll",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
  },
}));
