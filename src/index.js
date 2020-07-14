import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
// const Index = () => {
//   return <div>Hello React!</div>;
// };
ReactDOM.render(
 <App />,
  document.getElementById("root"));
if (module.hot) {
  // 通知 webpack改模块接受 hmr
  module.hot.accept();
}
