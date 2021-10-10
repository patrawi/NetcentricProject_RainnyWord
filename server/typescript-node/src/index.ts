const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 8000;

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket: any) {
  console.log("a user connected");
  socket.on("message", function (message: any) {
    console.log(message);
  });
});

const server = http.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
