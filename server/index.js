const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const foo = require("./foo");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const createLog = value => JSON.stringify({ type: "log", value: value });
const createFile = data =>
  JSON.stringify({ type: "file", value: data });

let running = false;

app.use("/", express.static(path.join(__dirname, "../public")));
app.get("/api", (req, res) => {
  res.send("api");
});

wss.on("connection", async ws => {
  if (running) {
    ws.close();
  } else {
    running = true;
    const data = await foo.bar(process.env.base_url);
    ws.send(createFile(data));
    ws.close();
    running = false;
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("listening on port " + port);
});
