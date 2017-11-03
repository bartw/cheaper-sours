const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use("/", express.static(path.join(__dirname, "../public")));
app.get("/api", (req, res) => {
  res.send("api");
});

wss.on("connection", ws => {
  ws.on("message", message => {
    console.log("received: " + message);
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send("Hi there, I am a WebSocket server");
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
