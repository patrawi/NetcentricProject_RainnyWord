import express, { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { Admin, Player } from "./interfaces/player.interface";
import { authenticateToken, generateJWT } from "./lib/admin";
import { Chat } from "./lib/chat";
import { removePlayers, updateLeaderboard } from "./lib/players";
import { randomWordsPerRound, WordObject } from "./lib/words";

const env = require("dotenv").config();
if (env.error) {
  throw env.error;
}

const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["rainy-word"],
    credentials: true,
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const MAX_PLAYERS = 20;
let players: Player[] = [];
const pubChats: Chat[] = [];

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
// For development only!
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
      return res.status(200).send({ status: "success", message: players });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ status: "bad request", message: "Invalid token." });
  }
});

// Admin: Press start button, all player will receive countdown message.
// 10s countdown signal will be emitted. Front-end display the countdown.
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
      io.emit("startWaitingRoomTimer", true);
      console.log("Countdown starts...");
      let words: WordObject[] = [];
      words = randomWordsPerRound(200);
      io.emit("words", words);

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
  console.log(`${socket.id} connected`);

  // Send players to client once client connects
  socket.on("onRetrievePlayers", function () {
    io.to(socket.id).emit("retrievePlayers", players);
  });

  // Update players, send updated players to client and the client info.
  socket.on("onAddPlayer", function (player: Player) {
    if (players.length < MAX_PLAYERS) {
      console.log(
        `${player.name} is connected. Total number of players is ${players.length}`
      );
      players.push(player);
      io.emit("updatePlayerList", players);
    }
  });

  // Game is not start until admin press start.
  io.emit("gameStart", false);

  socket.on("updateLeaderboard", function (targetUser: Player) {
    console.log(targetUser);
    players = updateLeaderboard(players, targetUser);
    io.emit("updatePlayerList", players);
  });

  socket.on("leaderboardEnd", function () {
    io.emit("updateLeaderboardEnd", players);
  });

  socket.on("publicChat", function (data: Chat) {
    if (data) pubChats.push(data);
    // Emit, then setState in Front-end.
    io.emit("onUpdatePublicChat", pubChats);
  });

  socket.on("privateChat", function (socketDestId, data: Chat) {
    // Save in front-end, backend will only send the message.
    // Emit, then setState in Front-end.
    socket.to(socketDestId).emit("privateChat", socket.id, data);
  });

  socket.on("disconnect", function () {
    console.log(`${socket.id} disconnected`);
    players = removePlayers(players, socket.id);
    console.log(players);
    io.emit("updatePlayerList", players);
  });
});

http.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
