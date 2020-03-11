import * as core from "core-js/stable";
import * as regen from "regenerator-runtime";


export const fetchCurrentPlan = async () => {
  return await $.ajax({
    url: "/api/current",
    type: "GET"
  });
}

export const fetchPreviousPlan = async () => {
  return await $.ajax({
    url: "/api/previous",
    type: "GET"
  })
}

export const fetchAvailablePlans = async () => {
  return await $.ajax({
    url: "/api/support/plans",
    type: "GET"
  });
}

export const fetchPlanPricing = async (plan, seats) => {
  return await $.ajax({
    url: "/api/preview",
    type: "GET",
    data: { plan, seats }
  });
}

export const updateCurrentPlan = async settings => {
  
  return await $.ajax({
    url: "/api/current",
    type: "PUT",
    data: { settings }
  });
}