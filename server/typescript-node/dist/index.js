"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./lib/admin");
const players_1 = require("./lib/players");
const words_1 = require("./lib/words");
const env = require("dotenv").config();
if (env.error) {
    throw env.error;
}
const app = (0, express_1.default)();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
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
const MAX_PLAYERS = 2;
let LOBBY_TIME = 20;
let GAME_TIME = 180;
let players = [];
const pubChats = [];
app.get("/", (req, res) => {
    // res.status(200).send("Hello Rainy Words!");
    res.sendFile(__dirname + "/index.html");
});
// Admin Login
app.post("/login", (req, res) => {
    const token = (0, admin_1.generateJWT)();
    return res.status(200).json({ status: "success", token: token });
    // TODO: Send Admin Front-end
});
// Authentication of Admin with jwt.
app.post("/adminauth", (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token || !header)
        return res.status(401).send({
            status: "unauthorized",
            message: "Please provide bearer token.",
        });
    try {
        const isAdmin = (0, admin_1.authenticateToken)(token);
        if (isAdmin === true) {
            res.status(200).send({ status: "success", message: "You are admin!" });
            next();
        }
        else {
            return res
                .status(401)
                .send({ status: "unauthorized", message: "You aren't admin!" });
        }
    }
    catch (err) {
        res.status(400).send({ status: "bad request", message: "Invalid token." });
    }
});
// Admin: Reset the game
// For development only!
app.post("/reset", (req, res) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token || !header)
        return res.status(401).send({
            status: "unauthorized",
            message: "Please provide bearer token.",
        });
    try {
        const isAdmin = (0, admin_1.authenticateToken)(token);
        if (isAdmin) {
            players = [];
            LOBBY_TIME = 20;
            GAME_TIME = 180;
            return res.status(200).send({ status: "success", message: players });
        }
    }
    catch (err) {
        return res
            .status(400)
            .send({ status: "bad request", message: "Invalid token." });
    }
});
// Admin: Press start button, all player will receive countdown message.
// 10s countdown signal will be emitted. Front-end display the countdown.
// Prepare words during the countdown.
app.post("/startgame", (req, res) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token || !header)
        return res.status(401).send({
            status: "unauthorized",
            message: "Please provide bearer token.",
        });
    try {
        const isAdmin = (0, admin_1.authenticateToken)(token);
        if (isAdmin) {
            io.emit("startWaitingRoomTimer", true);
            console.log("Countdown starts...");
            let words = [];
            words = (0, words_1.randomWordsPerRound)(200);
            io.emit("words", words);
            return res.status(200).send({
                status: "success",
                message: "Game will start after countdown.",
            });
        }
    }
    catch (err) {
        return res
            .status(400)
            .send({ status: "bad request", message: "Invalid token." });
    }
});
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    // --------------------- ADMINS FUNCTION -------------------------------
    socket.on("startLobbyCountdown", function () {
        setInterval(() => {
            io.emit("getCountdown", LOBBY_TIME);
        }, 1000);
    });
    socket.on("startGameCountdown", function () {
        setInterval(() => {
            io.emit("getCountdown", GAME_TIME);
        }, 1000);
    });
    // --------------------- PLAYERS FUNCTION -------------------------------
    // Send players to client once client connects
    socket.on("onRetrievePlayers", function () {
        io.to(socket.id).emit("retrievePlayers", players);
    });
    // Update players, send updated players to client and the client info.
    socket.on("onAddPlayer", function (player) {
        if (players.length < MAX_PLAYERS) {
            console.log(`${player.name} is connected. Total number of players is ${players.length}`);
            players.push(player);
            io.emit("updatePlayerList", players);
        }
    });
    // Game is not start until admin press start.
    io.emit("gameStart", false);
    socket.on("updateLeaderboard", function (targetUser) {
        players = (0, players_1.updateLeaderboard)(players, targetUser);
        io.emit("updatePlayerList", players);
    });
    socket.on("leaderboardEnd", function () {
        io.emit("updateLeaderboardEnd", players);
    });
    socket.on("publicChat", function (data) {
        if (data)
            pubChats.push(data);
        // Emit, then setState in Front-end.
        io.emit("onUpdatePublicChat", pubChats);
    });
    socket.on("disconnect", function () {
        console.log(`${socket.id} disconnected`);
        players = (0, players_1.removePlayers)(players, socket.id);
        // console.log(players);
        io.emit("updatePlayerList", players);
    });
});
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Listening to port ${process.env.PORT}`);
});
