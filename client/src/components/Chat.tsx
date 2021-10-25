import React, { useState, useContext } from "react";
import {
  CardContent,
  Card,
  Button,
  Switch,
  Input,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChatContext } from "./../context/ChatContext";
import { socket } from "../services/Socket";

const Chat = () => {
  const { privChat, setPrivChat, pubChat, setPubChat } =
    useContext(ChatContext);
  const [chatMode, setChatMode] = useState(true);
  const [message, setMessage] = useState("");

  const renderChat = () => {
    if (chatMode === true) {
      //Public Chat
      return (
        <div>
          {pubChat?.map((chat, index) => {
            return (
              <div key={index}>
                <p>{chat.message}</p>
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
              <p>{chat.message}</p>
            </div>
          );
        })}
      </div>;
    }
  };

  const handleTextChange = (val: string) => {
    if (val) {
      if (chatMode === true) {
        // const newChat = privChat?.push({
        // })
        // setPrivChat()
        // socket.emit()
      }
    }
  };
  const handleButtonClick = () => {
    if (message !== "") {
      console.log(message);
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
        <CardContent style={{ backgroundColor: "#eeffff" }}>
          {renderChat}
          <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
            <Input
              placeholder={
                chatMode ? "Public chat message" : "Private chat message"
              }
              //   onChange={(val: string) => handleTextChange(val)}
            />
            <Button variant="contained" onClick={() => handleButtonClick}>
              SEND
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;

const styles = makeStyles({});
