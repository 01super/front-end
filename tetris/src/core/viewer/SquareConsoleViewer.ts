import { Square } from "../Square";
import { IViewer } from "../types";
import $ from "jquery";
import PageConfig from "./PageConfig";

class SquareConsoleViewer implements IViewer {
  constructor(private _square: Square, private container: JQuery<HTMLElement>) {
    this._square = _square;
  }
  private dom?: JQuery<HTMLElement>;

  show() {
    if (!this.dom) {
      this.dom = $("<div>");
      this.container.append(this.dom);
      this.dom.css({
        position: "absolute",
        width: PageConfig.squareSize.width,
        height: PageConfig.squareSize.height,
        backgroundColor: this._square.color,
        border: "1px solid lightgray",
        boxSizing: "border-box",
      });
    }
    this.dom.css({
      left: this._square.point.x * PageConfig.squareSize.width + "px",
      top: this._square.point.y * PageConfig.squareSize.height + "px",
    });
  }
  remove() {
    console.log("移除");
  }
}

export default SquareConsoleViewer;
