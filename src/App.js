import React from "react";
import "./index.less";
import List from "components/list"
import Demo from "components/demo"
import Carousel from 'components/Carousel'
function App() {
   const getText = () => 'Hello React & Webpack!!'
  return (
    <>
      <List />
      {/* <Demo /> */}
      {/* <Carousel /> */}
      <h1>{getText()}</h1>
    </>
  );
}
export default App;
