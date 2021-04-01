import React, { Component } from "react";

// setState 可能是异步更新，可能会被合并
// 在原生事件和 setTimeout 中表现为同步
// 在 React 的合成事件中，表现为异步
export default class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  increase = () => {
    //   同时执行两次，会被合并（类似 Object.assign)
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 10 });

    // 函数形式不会被合并，但也是异步更新
    this.setState((preState) => ({ count: preState.count + 1 }));
    this.setState((preState) => ({ count: preState.count + 1 }));

    // 同步更新
    // setTimeout(() => {
    //   this.setState({ count: this.state.count + 10 });
    // });
  };

  componentDidMount() {
    const btn = document.querySelector("#btn");
    btn.addEventListener("click", () => {
      this.setState({ count: this.state.count + 1 });
      console.log("this.state.count: ", this.state.count);
    });
  }

  render() {
    return (
      <div>
        <br />
        <strong>State</strong>
        <br />
        <button onClick={this.increase}>increase</button>：{this.state.count}
        &nbsp;<button id="btn">原生事件触发按钮</button>
      </div>
    );
  }
}
