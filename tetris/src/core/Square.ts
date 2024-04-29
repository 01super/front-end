import { Point } from "./types";

/**
 * 小方块
 */
export class Square {
  constructor(private _point: Point, private _color: string) {}

  public get point() {
    return this._point;
  }

  public set point(val: Point) {
    this._point = val;
    // 完成显示
  }

  public get color() {
    return this._color;
  }
}

