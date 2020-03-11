import * as SupportAPIUtil from '../utils/support_api_util';
import SupportPlan from '../models/SupportPlan';
export const RECEIVE_CURRENT_PLAN = "RECEIVE_CURRENT_PLAN";
export const RECEIVE_AVAILABLE_PLANS = "RECEIVE_AVAILABLE_PLANS";
export const RECEIVE_PREVIOUS_PLAN = "RECEIVE_PREVIOUS_PLAN";



const receiveCurrentPlan = currentPlan => {
  const { plan, name, seats, cost } = currentPlan;
  const currPlan = new SupportPlan(plan, name, seats, cost);

  return ({
    type: RECEIVE_CURRENT_PLAN,
    currPlan
  })
};

const receivePreviousPlan = previousPlan => {
  const { plan, name, seats, cost } = previousPlan;
  const prevPlan = new SupportPlan(plan, name, seats, cost);

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



export const fetchCurrentPlan = () => dispatch => (
  SupportAPIUtil.fetchCurrentPlan()
    .then(plan => dispatch(receiveCurrentPlan(plan)))
);

export const fetchPreviousPlan = () => dispatch => (
  SupportAPIUtil.fetchPreviousPlan()
    .then(plan => dispatch(receivePreviousPlan(plan)))
)

export const fetchAvailablePlans = () => dispatch => (
  SupportAPIUtil.fetchAvailablePlans()
    .then(plans => dispatch(receiveAvailPlans(plans)))
);

export const updateCurrentPlan = plan => dispatch => (
  SupportAPIUtil.updateCurrentPlan(plan)
    .then(plan => dispatch(receiveCurrentPlan(plan)))
);