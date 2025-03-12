import { Square } from "./core/Square";
import SquareConsoleViewer from "./core/viewer/SquareConsoleViewer";
import $ from "jquery";

const sq = new Square({ x: 1, y: 2 }, "red");
sq.viewer = new SquareConsoleViewer(sq, $("#container"));
sq.point = { x: 23, y: 24 };
console.log(sq.point, sq.color);
