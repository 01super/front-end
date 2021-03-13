import React from "react";
import ReactDOM from "react-dom";
import App from "./LifeCycle";
import Event from "./Event";
import State from "./State";
import Portals from "./Portals";

// 抽离公共逻辑的两中方法：高阶组件和render props ↓↓↓↓↓↓↓
import HOC from "./HOC";
import RenderProps from "./RenderProps";
// ↑↑↑↑↑↑↑↑↑

// 异步加载组件
const Context = React.lazy(() => import("./Context"));

ReactDOM.render(
  <React.StrictMode>
    <App name="App" />
    <Event />
    <State />
    <Portals />
    {/* 使用异步加载的组件需要使用Suspense包裹 */}
    <React.Suspense fallback={<div>loadding</div>}>
      <Context />
    </React.Suspense>
    {/* 如果内部没有第一步透传所有 props，则上面的标签上面的 name 属性便取不到 */}
    <HOC name="HOC" />
    <RenderProps name="HOC" />
  </React.StrictMode>,
  document.getElementById("root")
);
