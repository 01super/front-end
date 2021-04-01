import React from "react";
import ReactDOM from "react-dom";

const style = {
  position: "fixed",
  right: 100,
  top: 100,
  width: 200,
  height: 200,
  background: "lightblue",
  border: "1px solid #ccc",
};

export default function Portals() {
  return ReactDOM.createPortal(
    <div style={style}>Portals Element</div>,
    document.body
  );
}
