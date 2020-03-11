import { RECEIVE_CURRENT_PLAN, RECEIVE_PREVIOUS_PLAN, RECEIVE_AVAILABLE_PLANS } from '../actions/support_actions';

const SupportReducer = (oldState = {currentPlan: [], availablePlans: []}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {

    case RECEIVE_CURRENT_PLAN:
      newState["currentPlan"] = action.currPlan;
      return newState;

    case RECEIVE_PREVIOUS_PLAN:
      newState["previousPlan"] = action.prevPlan;
      return newState;

    case RECEIVE_AVAILABLE_PLANS:
      newState["availablePlans"] = action.availablePlans;
      return newState;

    default:
      return oldState;
  }
};

export default SupportReducer;