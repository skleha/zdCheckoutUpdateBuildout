import React, { useState, useEffect } from "react";
import * as helperFuncs from '../helpers/helperFuncs';
import Subscription from "../models/Subscription";
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";
import { withRouter } from "react-router";


function PlanUpdate(props) {
  
  const [selectedSub, setSelectedSub] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const { plan, name, seats, cost } = props.currentSub;
    const newSub = new Subscription(plan, name, seats, cost);
    setSelectedSub(newSub);
    setIsLoading(false);
  }, []);


  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    const selectedName = props.plansAndNames[selectedPlan];

    handleSubscriptionChange(
      selectedPlan,
      selectedName,
      selectedSub.seats
    );
  };


  const handleSeatChange = (e) => {
    const seats = e.target.value;

    handleSubscriptionChange(
      selectedSub.plan,
      selectedSub.name,
      seats
    );
  };


  const handleSubscriptionChange = async (plan, planName, seats) => {
    const validSeatNum = helperFuncs.validateSeatNum(seats);
    const { cost } = validSeatNum ? await SubscriptionAPIUtil.fetchPlanPricing(props.product, plan, seats) : { cost: 0 }
    const newSub = new Subscription(plan, planName, seats, cost);

    const {
      hasPlanChanged,
      hasSeatsChanged
    } = helperFuncs.hasSubscriptionChanged(newSub, props.currentSub);
    
    // Set component state
    setSelectedSub(newSub);
    setUpdateButtonEnabled((hasPlanChanged || hasSeatsChanged) && validSeatNum);

    // Set parent state if different subscription with valid seats
    if ((hasPlanChanged || hasSeatsChanged) && validSeatNum) {
      props.onNewSubSelect(newSub);
    } else {
      props.onNewSubSelect({});
    }

  };


  const handleUpdatePlanClick = async (e) => {
    await SubscriptionAPIUtil.updateCurrentSub(props.product, selectedSub);
    props.history.push("/confirm");
  };
  
  const plans = Object.keys(props.plansAndNames);


  if (isLoading) {
  
    return null;
  
  } else if (error) {
  
    return `${props.product} subscription data not available`;
  
  } else {

    return (
      <div className="update-component">
        <div className="update-product">{`${props.product} Plan`}</div>

        <div className="update-grid">
          <div className="update-header">Plan</div>
          <div className="update-header">Seats</div>
          <div className="update-header">Cost</div>

          <select
            className="update-select"
            data-testid="plan-select"
            value={selectedSub.plan}
            onChange={handlePlanChange}
          >
            {plans.map((plan, idx) => (
              <option key={idx} value={plan}>
                {props.plansAndNames[plan]}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="update-input"
            data-testid="seats-select"
            value={selectedSub.seats}
            onChange={handleSeatChange}
          />

          <div className="update-cost" data-testid="cost">{selectedSub.cost}</div>
        </div>

        <button
          className="update-button"
          disabled={!updateButtonEnabled}
          onClick={handleUpdatePlanClick}>
            Update
        </button>
      
      </div>
    );
  }
}

export default withRouter(PlanUpdate);
