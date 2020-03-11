import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root";
import { fetchPreviousPlan } from "./actions/support_actions";
// import { fetchPreviousPlan } from "./utils/support_api_util";

document.addEventListener("DOMContentLoaded", () => {
  
  const store = configureStore();
  
  // Functions defined on the window
  window.fetchPreviousPlan = fetchPreviousPlan;
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
