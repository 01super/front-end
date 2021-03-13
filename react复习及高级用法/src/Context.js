import React, { Component } from "react";

// 可以用于共享语言、主题等公共信息
const ThemeContext = React.createContext("light");

export default class Context extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <ToolBar />
        <FnComponent />
      </ThemeContext.Provider>
    );
  }
}

class ToolBar extends Component {
  static contextType = ThemeContext;
  render() {
    const theme = this.context;
    return <div>ToolBar theme {theme}</div>;
  }
}

function FnComponent() {
  // 也可以使用这种方式来消费context
  //   const context = React.useContext(ThemeContext);
  //   console.log("context: ", context);
  return (
    <ThemeContext.Consumer>
      {(val) => <div>FnComponent: {val}</div>}
    </ThemeContext.Consumer>
  );
}
