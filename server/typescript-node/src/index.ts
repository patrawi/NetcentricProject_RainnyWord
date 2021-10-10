import express, { NextFunction, Request, Response } from "express";
import { Player } from "./interfaces/player.interface";

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 8000;

const MAX_PLAYERS = 5;
let players: Player[] = [];

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addplayer/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  if (!name)
    return res
      .status(400)
      .json({ status: "error", error: "Name cannot be blank." });

  if (players.length >= MAX_PLAYERS)
    return res.status(400).json({
      status: "error",
      error: `Players are full. Maximum is ${MAX_PLAYERS}.`,
    });

  //TODO: Check user name if it's duplicated.
  // Add new player.
  const newPlayer: Player = { name: name, score: 0 };
  players.push(newPlayer);
  res.status(200).json(players);
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("message", function (message: any) {
    console.log(message);
  });
});

http.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
