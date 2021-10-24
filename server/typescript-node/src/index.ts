import express, { NextFunction, Request, Response } from "express";
import { SocketAddress } from "net";
import { Socket } from "socket.io";
import { Admin, Player } from "./interfaces/player.interface";
import { authenticateToken, generateJWT } from "./lib/admin";
import { removePlayers, addPlayer, updateLeaderboard } from "./lib/players";
import { randomWordsPerRound, WordObject } from "./lib/words";

const env = require("dotenv").config();
if (env.error) {
  throw env.error;
}

const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"],
    allowedHeaders : ["rainy-word"],
    credentials : true

  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
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
      io.emit("startWaitingRoomTimer",true);
      ROUND++;
      console.log("Countdown starts...");
      console.log(`Round ${ROUND}`);
      let words: WordObject[] = [];

      io.emit("round", ROUND);
      if (ROUND === 1) {
        words = randomWordsPerRound(100);
        io.emit("wordsFirstRound", words);
      } else if (ROUND === 2) {
        words = randomWordsPerRound(150);
        io.emit("wordsSecondRound", words);
      }

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

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  // Update players, send updated players to client and the client info.
  socket.on("onAddPlayer", function (name: string) {
    if (players.length < MAX_PLAYERS) {
      console.log(`${name} connected!`);
      players = addPlayer(players, name, socket.id);
      io.emit("updatePlayerList", players);
    }
  });
  // Remove player using id.
  socket.on("onRemovePlayer", function (id: string) {
    players = removePlayers(players, id);
    io.emit("updatePlayerList", players);
  });
  // Game is not start until admin press start.
  io.emit("gameStart", false);

  socket.on(
    "updateLeaderboard",
    function (data: { id: string; score: number }) {
      players = updateLeaderboard(players, data.id, data.score);
      io.emit("updatePlayerList", players);
    }
  );

  socket.on("disconnect", function () {
    console.log("a user disconnected");
    console.log(JSON.stringify(players));
  });
});

http.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});


