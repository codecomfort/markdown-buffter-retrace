import React from "react";
import ReactDOM from "react-dom";

interface IState {
}

class App extends React.Component<{}, IState> {
  render() {
    return <div>Markdown Editor</div>;
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));