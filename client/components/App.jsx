import React from "react";
import "./App.css";

export default function App() {
  const socket = new WebSocket("ws://" + document.location.host);
  socket.onopen = () => {
    socket.send("Ping");
  };
  socket.onmessage = function(event) {
    console.log(event.data);
  };
  return <h1>Hearse-corpus</h1>;
}
