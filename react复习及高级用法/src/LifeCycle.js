import React, { Component } from "react";
class App extends Component {
  // 通常，在 React 中，构造函数仅用于以下两种情况：
  //   通过给 this.state 赋值对象来初始化内部 state。
  //   为事件处理函数绑定实例
  // 如果不需要初始化state或者不进行方法绑定，则不需要实现构造函数
  // 要避免在构造函数中引入任何副作用或订阅;
  constructor(props) {
    super(props);
    console.log("constructor: ", props);
    this.plus = this.plus.bind(this);
    this.state = {
      count: 1,
    };
  }

  // 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
  // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  // getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state
  // 父级重新渲染，会导致这个生命周期的执行
  static getDerivedStateFromProps(props, state) {
    console.log("getDervidedStateFromProps");
    console.log("props, state: ", props, state);
    return state;
  }

  // 在最近一次渲染输出（提交到 DOM 节点）之前调用。
  // 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
  // getSnapshotBeforeUpdate必须配合componentDidUpdate使用
  // 返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。
  getSnapshotBeforeUpdate(props, state) {
    console.log("getSnapshotBeforeUpdate: ", props, state);
    return state;
  }

  // 更新后会被立即调用。首次渲染不会执行此方法。
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate: ", prevProps, prevState, snapshot);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // 实现清理操作，如清除timer，取消请求、订阅等
  componentWillUnmount() {}

  // 返回false则不会调用render方法
  // 首次渲染或使用 forceUpdate() 时不会调用该方法，但是他的子组件不受影响
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  plus() {
    this.setState({ count: this.state.count + 1 });
  }

  // 其他生命周期：
  // static getDerivedStateFromError(error)
  // static getDerivedStateFromError() 或 componentDidCatch()

  // render函数可返回：
  // react元素、数组或fragment、Protals传送门、string、Boolean、number、null
  render() {
    console.log("render");
    const { count } = this.state;
    return (
      <div>
        <header>
          <h1>header</h1>
          <code>{count}</code>
          <hr />
          <button onClick={this.plus}>plus +</button>
        </header>
      </div>
    );
  }
}

// 默认props
App.defaultPrups = {
  color: "red",
};

// 用于调试信息
App.displayName = "App class component";

export default App;
