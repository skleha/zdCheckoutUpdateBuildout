import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from "./components/Root";
import {  fetchCurrentPlan, 
          fetchPreviousPlan, 
          fetchAvailablePlans, 
          fetchPlanPricing, 
          updateCurrentPlan } from "./utils/subscription_api_util";

document.addEventListener("DOMContentLoaded", () => {
  
  const store = configureStore();
  
  // Functions defined on the window
  window.fetchCurrentPlan = fetchCurrentPlan;
  window.fetchPreviousPlan = fetchPreviousPlan;
  window.fetchAvailablePlans = fetchAvailablePlans;
  window.fetchPlanPricing = fetchPlanPricing;
  window.updateCurrentPlan = updateCurrentPlan;
  
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
