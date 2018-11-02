import React, { SyntheticEvent } from "react";
import ReactDOM from "react-dom";
import { Proxy } from "./lib/workerProxy";
import "@babel/polyfill";
import { MarkdownCompiler } from "./worker";

// Global State
// 本家の意図が分からないが、Redux があったらそこで管理するような
// アプリ全体に関するステートはコンポーネント外に出ししておく意図か
let proxy: MarkdownCompiler;

interface IState {
  raw: string;
}

class App extends React.Component<{}, IState> {
  state = {
    raw: "initial value",
  };

  async componentDidMount() {
    proxy = await new Proxy();
    const lastState = await proxy.getLastState();

    this.setState({
      raw: lastState.raw,
    });
  }

  render() {
    return (
      <>
        <div style={{ flex: 1, height: "100vh" }}>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "800px",
                width: "100%",
              }}
            >
              {/* 本家の意図は分からないが、Uncontrolled なコンポーネントとして実装されている */}
              <textarea
                className="js-editor editor"
                spellCheck={false}
                defaultValue={this.state.raw}
              />
            </div>
          </div>
        </div>
        <div
          className="js-preview-container"
          style={{
            background: "#eee",
            flex: 1,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div style={{ overflowY: "auto" }}>
            <div
              className="js-preview markdown-body"
              style={{ padding: "10px", lineHeight: "1.3em" }}
            >
              ...
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <span
            className="js-wordcount"
            style={{ fontFamily: "monospace", color: "cornflowerblue" }}
          >
            ...
          </span>
          <button className="js-preview-toggle">👀</button>
        </div>
      </>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
