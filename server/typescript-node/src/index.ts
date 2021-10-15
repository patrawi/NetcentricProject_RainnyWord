import express, { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Admin, Player } from "./interfaces/player.interface";
import { authenticateToken, generateJWT } from "./lib/admin";
import { randomWordsFirstRound, randomWordsSecondRound } from "./lib/words";
var randomWords = require("random-words");

const env = require("dotenv").config();
if (env.error) {
  throw env.error;
}

const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MAX_PLAYERS = 5;
let players: Player[] = [];
let ROUND = 0;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

// Admin Login
app.post("/login", (req: Request<{}, {}, Admin>, res: Response) => {
  const token = generateJWT();
  return res.status(200).json({ status: "success", token: token });
  // TODO: Send Admin Front-end
});

// Authentication of Admin with jwt.
app.post("/adminauth", (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token || !header)
    return res.status(401).send({
      status: "unauthorized",
      message: "Please provide bearer token.",
    });

  try {
    const isAdmin = authenticateToken(token);
    if (isAdmin === true) {
      res.status(200).send({ status: "success", message: "You are admin!" });
      next();
    } else {
      return res
        .status(401)
        .send({ status: "unauthorized", message: "You aren't admin!" });
    }
  } catch (err) {
    res.status(400).send({ status: "bad request", message: "Invalid token." });
  }
});

// Admin: Reset the game
app.post("/reset", (req: Request, res: Response) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token || !header)
    return res.status(401).send({
      status: "unauthorized",
      message: "Please provide bearer token.",
    });

  try {
    const isAdmin = authenticateToken(token);
    if (isAdmin) {
      players = [];
      ROUND = 0;
      return res.status(200).send({ status: "success", message: players });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ status: "bad request", message: "Invalid token." });
  }
});

// Admin: Press start button, all player will receive countdown message.
// 30s countdown signal will be emitted. Front-end display the countdown.
// Prepare words during the countdown.
app.post("/startgame", (req: Request, res: Response) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token || !header)
    return res.status(401).send({
      status: "unauthorized",
      message: "Please provide bearer token.",
    });

  try {
    const isAdmin = authenticateToken(token);
    if (isAdmin) {
      io.emit("startWaitingRoomTimer");
      ROUND++;
      console.log("Countdown starts...");
      console.log(`Round ${ROUND}`);
      let words: string[] = [];

      if (ROUND === 1) {
        words = randomWordsFirstRound(100);
        io.emit("wordsFirstRound", words);
      } else if (ROUND === 2) {
        words = randomWordsSecondRound(150);
        io.emit("wordsSecondRound", words);
      }

      console.log(words);

      return res.status(200).send({
        status: "success",
        message: "Game will start after countdown.",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ status: "bad request", message: "Invalid token." });
  }
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

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  // Game is not start until admin press start.
  io.emit("gameStart", false);
});

http.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
