import React from "react";
import "./index.less";
function App() {
   const getText = () => 'Hello React & Webpack!!'
  return (
    <>
      <h1>{getText()}</h1>
    </>
  );
}
export default App;
