import React from "react";
import ReactDOM from "react-dom";

interface IState {
}

class App extends React.Component<{}, IState> {
  render() {
    return (
      <>
        <div style={{ flex: 1, height: "100vh" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{width: "100%", maxWidth: "800px", marginLeft: "auto", marginRight: "auto"}}>
              <textarea className="js-editor editor" spellCheck={false} defaultValue="Loading..." />
            </div>
          </div>
        </div>
        <div className="js-preview-container" style={{  flex: 1, height: "100vh", overflowY: "auto", background: "#eee" }}>
          <div style={{ overflowY: "auto" }}>
            <div className="js-preview markdown-body" style={{ padding: "10px", lineHeight: "1.3em" }}>
              ...
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <span className="js-wordcount" style={{ fontFamily: "monospace", color: "cornflowerblue" }}>...</span>
          <button className="js-preview-toggle">👀</button>
        </div>
      </>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));