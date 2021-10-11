import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { startCountdown } from "./lib/timer";
import { Admin, Player } from "./interfaces/player.interface";
import { generateJWT } from "./lib/admin";

const env = require("dotenv").config();
if (env.error) {
  throw env.error;
}

const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MAX_PLAYERS = 5;
let players: Player[] = [];

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

// Admin Login
app.post("/login", (req: Request<{}, {}, Admin>, res: Response) => {
  console.log(req.body);
  const token = generateJWT();
  return res.status(200).json({ status: "success", token: token });
  // TODO: Send Admin Front-end
});

app.post("/adminauth", (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: Admin) => {
    if (err) return res.sendStatus(403);
    else {
      res
        .status(200)
        .send({ status: "success", message: "Admin login successful!" });
      next();
    }
  });
});

io.on("connection", (socket: any) => {
  socket.on("adminEnter", () => {
    console.log("Hello, Admin.");
  });
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
      message: `Players are full. Maximum is ${MAX_PLAYERS}.`,
    });

  //TODO: Check user name if it's duplicated.
  // Add new player.
  const newPlayer: Player = { name: name, score: 0, id: uuidv4() };
  players.push(newPlayer);
  res.status(200).json(players);
});

app.get("/randomwords", (req: Request, res: Response) => {
  let words: string[] = [];
  res.status(200).send({ status: "success", message: words });
  // TODO: Punlee's words randomizer
  // 100 words each round
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  // Start waiting room timer.

  socket.on("startTimer", (req: Request, res: Response) => {
    const time = 30;
    setInterval(() => startCountdown(time), 3000);
    res.status(200).json({ status: "success", timer: time });
  });
});

http.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
