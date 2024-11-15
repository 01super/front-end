import * as map from "./map.js";

const divContainer = document.getElementById("game");

const pieceWidth = 45;
const pieceHeight = 45;

function setDivContainer() {
  divContainer.style.width = pieceWidth * map.colNumber + "px";
  divContainer.style.height = pieceHeight * map.rowNumber + "px";
}

function createDiv(row, col, content) {
  const div = document.createElement("div");
  div.className = "item " + map.classMap[content];
  div.style.left = col * pieceWidth + "px";
  div.style.top = row * pieceHeight + "px";
  divContainer.appendChild(div);
}

function setContent() {
  divContainer.innerHTML = "";
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      const content = map.content[row][col];
      createDiv(row, col, content);
    }
  }
}

export { setDivContainer, setContent };
