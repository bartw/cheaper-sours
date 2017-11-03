import React from "react";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function App() {
  const socket = new WebSocket("ws://" + document.location.host);
  socket.onopen = () => {
    socket.send("Ping");
  };
  socket.onmessage = function(event) {
    console.log(event.data);
  };
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
