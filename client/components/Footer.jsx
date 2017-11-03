import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>
        Fork this website on{" "}
        <a
          href="https://github.com/bartw/hearse-corpus"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>.
      </p>
    </div>
  );
}

export default Footer;
