import React from "react";
import * as helperFuncs from '../helpers/helperFuncs';
import Subscription from "../models/Subscription";
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";
import { withRouter } from "react-router";


function PlanUpdate(props) {
  
  const [selectedSub, setSelectedSub] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  const [errors, setErrors] = useState(false);


  useEffect(() => {
    const { plan, name, seats, cost } = this.props.currentSub;
    const selectedSub = new Subscription(plan, name, seats, cost);
    setSelectedSub(selectedSub);
    setIsLoading(false);
  })


  const handlePlanChange = (e) => {
    const selectedSub = e.target.value;
    const selectedName = this.props.plansAndNames[selectedSub];

    this.handleSubscriptionChange(
      selectedSub,
      selectedName,
      this.state.selectedSub.seats
    );
  }


  const handleSeatChange = (e) => {
    const seats = e.target.value;

    this.handleSubscriptionChange(
      this.state.selectedSub.plan,
      this.state.selectedSub.name,
      seats
    );
  }


  const handleSubscriptionChange = async (plan, planName, seats) => {

    const validSeatNum = helperFuncs.validateSeatNum(seats);
    const { cost } = validSeatNum ? await SubscriptionAPIUtil.fetchPlanPricing(this.props.product, plan, seats) : { cost: 0 }
    const selectedSub = new Subscription(plan, planName, seats, cost);

    const {
      hasPlanChanged,
      hasSeatsChanged
    } = helperFuncs.hasSubscriptionChanged(selectedSub, this.props.currentSub);

    this.setState({
      selectedSub,
      updateButtonEnabled: (hasPlanChanged || hasSeatsChanged) && validSeatNum
    });

  }


  const handleUpdatePlanClick = (e) => {
    await SubscriptionAPIUtil.updateCurrentSub(this.props.product, this.state.selectedSub);
    this.props.history.push("/confirm");
  }


  
    
    
    const plans = Object.keys(this.props.plansAndNames);

  if (this.state.isLoading) {
  
    return null;
  
  } else if (this.state.error) {
  
    return "Plan Data Not Available";
  
  } else {

    return (
      <div className="update-component">
        <div className="update-product">{`${this.props.product} Plan`}</div>

        <div className="update-grid">
          <div className="update-header">Plan</div>
          <div className="update-header">Seats</div>
          <div className="update-header">Cost</div>

          <select
            className="update-select"
            data-testid="plan-select"
            value={this.state.selectedSub.plan}
            onChange={this.handlePlanChange}
          >
            {plans.map((plan, idx) => (
              <option key={idx} value={plan}>
                {this.props.plansAndNames[plan]}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="update-input"
            data-testid="seats-select"
            value={this.state.selectedSub.seats}
            onChange={this.handleSeatChange}
          />

          <div className="update-cost" data-testid="cost">{this.state.selectedSub.cost}</div>
        </div>

        <button
          className="update-button"
          disabled={!this.state.updateButtonEnabled}
          onClick={this.handleUpdatePlanClick}>
            Update
        </button>
      
      </div>
    );
  }
}

export default withRouter(PlanUpdate);
