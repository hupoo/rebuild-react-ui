import React from "react";
import "./index.less";
import List from "components/list"
import Demo from "components/demo"
function App() {
   const getText = () => 'Hello React & Webpack!!'
  return (
    <>
      {/* <List /> */}
      <Demo />
      <h1>{getText()}</h1>
    </>
  );
}
export default App;
