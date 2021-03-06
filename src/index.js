import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import store from './store'
import { Provider } from 'react-redux';		
import 'katex/dist/katex.min.css';			
ReactDOM.render(
<Provider store ={store}>
  <App />
  </Provider>,
 document.getElementById("root"));
if (module.hot) {
  module.hot.accept();
}
