import * as SubscriptionAPIUtil from '../utils/subscription_api_util';
import Subscription from '../models/Subscription';
export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";
export const RECEIVE_AVAILABLE_PLANS = "RECEIVE_AVAILABLE_PLANS";
export const RECEIVE_PREVIOUS_PLAN = "RECEIVE_PREVIOUS_PLAN";



const receiveCurrentPlan = currentPlan => {
  const { plan, name, seats, cost } = currentPlan;
  const currPlan = new Subscription(plan, name, seats, cost);

  return ({
    type: RECEIVE_CURRENT_PLAN,
    currPlan
  })
};

const receivePreviousPlan = previousPlan => {
  const { plan, name, seats, cost } = previousPlan;
  const prevPlan = new Subscription(plan, name, seats, cost);

  return {
    type: RECEIVE_PREVIOUS_PLAN,
    prevPlan
  };
};

const receiveAvailPlans = availablePlans => {
  return ({
    type: RECEIVE_AVAILABLE_PLANS,
    availablePlans
  })
};



export const fetchCurrentPlan = (product) => dispatch => (
  SubscriptionAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrentPlan(plan)))
);

export const fetchPreviousPlan = (product) => dispatch => (
  SubscriptionAPIUtil.fetchPreviousPlan()
    .then(plan => dispatch(receivePreviousPlan(plan)))
)

export const fetchAvailablePlans = (product) => dispatch => (
  SubscriptionAPIUtil.fetchAvailablePlans()
    .then(plans => dispatch(receiveAvailPlans(plans)))
);

export const updateCurrentPlan = (product, plan) => dispatch => (
  SubscriptionAPIUtil.updateCurrentPlan(product, plan)
    .then(plan => dispatch(receiveCurrentPlan(plan)))
);