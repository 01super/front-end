import { IViewer, Point } from "./types";
/**
 * 小方块
 */
export class Square {
  // 属性：显示者，将方块渲染
  public viewer?: IViewer;

  constructor(private _point: Point, private _color: string) {}
  // 获取坐标
  public get point() {
    return this._point;
  }

  public set point(val: Point) {
    this._point = val;
    // 完成显示
    this.viewer?.show();
  }

  // 只写get，不写set，只能读取，不能修改
  public get color() {
    return this._color;
  }
}
