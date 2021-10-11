import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { startCountdown } from "./lib/timer";
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

// Admin Login
// app

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
  const newPlayer: Player = { name: name, score: 0, id: uuidv4() };
  players.push(newPlayer);
  res.status(200).json(players);
});

app.get("/randomwords", (req: Request, res: Response) => {
  let words: string[] = [];
  res.status(200).send(words);
  // TODO: Punlee's words randomizer
  // 100 words each round
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  // Start waiting room timer.
});

http.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
