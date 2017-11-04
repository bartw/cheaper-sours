import React from "react";
import "./Content.css";

const append = (current, toAppend) => {
  const newLine = current.length ? "\n" : "";
  return current + newLine + toAppend;
};

const download = (text, type, name) => {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { running: false, log: "" };
  }

  start = () => {
    this.setState(() => ({ running: true, log: "" }));
    const protocol = document.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(protocol + "://" + document.location.host);
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === "log") {
        this.setState(prevState => ({
          log: append(prevState.log, data.value)
        }));
      } else if (data.type === "file") {
        download(
          data.value,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "data.xlsx"
        );
      }
    };
    socket.onclose = event => {
      this.setState(prevState => ({
        log: append(prevState.log, "socket closed"),
        running: false
      }));
      socket.close();
    };
  };

  render() {
    return (
      <div className="content">
        <div>
          <textarea value={this.state.log} rows="40" cols="150" />
        </div>
        {!this.state.running && <button onClick={this.start}>Start</button>}
      </div>
    );
  }
}

export default Content;
