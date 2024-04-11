import React, { Component } from "react";

class App extends Component {
  render() {
    const {
      mouse: { x, y },
    } = this.props;
    return (
      <div>
        鼠标位置：{x}，{y}
      </div>
    );
  }
}

class RenderProps extends Component {
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
    console.log("RenderProps props: ", this.props);
    return (
      <div
        onMouseMove={this.handleMoustMove}
        style={{ height: 200, border: "1px solid #ccc" }}
      >
        {this.props.render(this.state.mouse)}
      </div>
    );
  }
}


export default class Wrappered extends Component {
  render() {
    return (
      <RenderProps {...this.props} render={(mouse) => <App mouse={mouse} />} />
    );
  }
}
