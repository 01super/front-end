import React, { Component } from "react";

class App extends Component {
  render() {
    const {
      mouse: { x, y },
    } = this.props;
    console.log("this.props: ", this.props);
    return (
      <div>
        <header>
          鼠标位置：{x}，{y}
        </header>
      </div>
    );
  }
}

// HOC
function WidthMouse(Com) {
  return class HOC extends Component {
    state = {
      mouse: {
        x: 0,
        y: 0,
      },
    };
    handleMoustMove = (event) => {
      this.setState({
        mouse: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    };
    render() {
      console.log("HOC props: ", this.props);
      return (
        <div
          onMouseMove={this.handleMoustMove}
          style={{ height: 200, border: "1px solid #ccc" }}
        >
          {/* 1. 透传所有的 props，增加 mouse 属性 */}
          <Com {...this.props} mouse={this.state.mouse} />
        </div>
      );
    }
  };
}

export default WidthMouse(App);
