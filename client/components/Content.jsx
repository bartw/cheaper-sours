import React from "react";
import "./Content.css";

const append = (current, toAppend) => {
  const newLine = current.length ? "\n" : "";
  return current + newLine + toAppend;
};

const download = (text, name) => {
  var a = document.createElement("a");
  var file = new Blob([text], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = "test.txt";
  a.click();
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { started: false, log: "" };
  }

  start = () => {
    this.setState(() => ({ started: true }));
    const protocol = document.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(protocol + "://" + document.location.host);
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === "log") {
        this.setState(prevState => ({
          log: append(prevState.log, data.value)
        }));
      } else if (data.type === "file") {
        console.log(data.value);
        download(data.value);
      }
    };
  };

  render() {
    return (
      <div className="content">
        {this.state.started ? (
          <textarea value={this.state.log} />
        ) : (
          <button onClick={this.start}>Start</button>
        )}
      </div>
    );
  }
}

export default Content;
