import React, { Component } from "react";

export default class Event extends Component {
  handleClick = (event) => {
    // SyntheticBaseEvent 基础合成事件，模拟 DOM 事件的所有能力
    console.log("event: ", event);
    // 指向当前触发事件的元素
    console.log("event.target: ", event.target);
    // 指向当前元素，假象
    console.log("event.currentTarget: ", event.currentTarget);
    // 原生事件
    console.log("event.nativeEvent: ", event.nativeEvent);
    // 原生事件，指向当前触发事件的元素，等于 event.target
    console.log("event.nativeEvent.target: ", event.nativeEvent.target);
    // 所有的事件都会被挂载到根节点上，React17之前，是把事件挂载到document上
    console.log(
      "event.nativeEvent.currentTarget: ",
      event.nativeEvent.currentTarget
    );
    console.log(event.target === event.nativeEvent.target);
  };

  handlePassParams = (a, b, e) => {
    console.log("a, b, e: ", a, b, e);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>react的事件</button>
        <button onClick={() => this.handlePassParams(1, 2)}>参数传递</button>
        {/* 这种事件绑定形式，React 会自动在最后面追加一个参数 event */}
        <button onClick={this.handlePassParams.bind(this, 1, 2)}>
          参数传递 bind
        </button>
      </div>
    );
  }
}
