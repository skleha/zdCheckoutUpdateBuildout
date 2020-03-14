import React from "react";
import * as helperFuncs from '../helpers/helperFuncs';
import Subscription from "../models/Subscription";
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";
import { withRouter } from "react-router";


class PlanUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "",
      isLoading: true,
      updateButtonEnabled: false,
      error: false
    }

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleUpdatePlanClick = this.handleUpdatePlanClick.bind(this);
  }

  
  async componentDidMount() {
      const { plan, name, seats, cost } = this.props.currentPlan;
      this.setState({
        selectedPlan: new Subscription(plan, name, seats, cost),
        isLoading: false,
      });    
  }


  handlePlanChange(e) {
    const selectedPlan = e.target.value;
    const selectedName = this.state.plansAndNames[selectedPlan];
  
    this.handleSubscriptionChange(
      selectedPlan,
      selectedName,
      this.state.selectedPlan.seats
    );
  }


  handleSeatChange(e) {
    const seats = e.target.value;

    this.handleSubscriptionChange(
      this.state.selectedPlan.plan,
      this.state.selectedPlan.name,
      seats
    );
  }


  async handleSubscriptionChange(plan, planName, seats) {
    
    // HANDLE INVALID SEAT COUNT
    const convertedSeatNum = Number(seats);
    const validSeatNum = (Number.isInteger(convertedSeatNum) && convertedSeatNum > 0) ? true : false;

    const { cost } = validSeatNum ? await SubscriptionAPIUtil.fetchPlanPricing(this.props.product, plan, seats) : { cost: 0 }
    const selectedPlan = new Subscription(plan, planName, seats, cost);
    const currentPlan = this.state.currentPlan;

    const {
      hasPlanChanged,
      hasSeatsChanged
    } = helperFuncs.hasSubscriptionChanged(selectedPlan, currentPlan);

    this.setState({
      selectedPlan,
      updateButtonEnabled: hasPlanChanged || hasSeatsChanged
    });
  
  }


  async handleUpdatePlanClick(e) {
    await SubscriptionAPIUtil.updateCurrentPlan(this.props.product, this.state.selectedPlan);
    this.props.history.push("/confirm");
  }


  render() {
    if (this.state.isLoading) return null;
    if (this.state.error) return "Plan Data Not Available";
    const plans = Object.keys(this.state.plansAndNames);


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
            value={this.state.selectedPlan.plan}
            onChange={this.handlePlanChange}
          >
            {plans.map((plan, idx) => (
              <option key={idx} value={plan}>
                {this.state.plansAndNames[plan]}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="update-input"
            data-testid="seats-select"
            value={this.state.selectedPlan.seats}
            onChange={this.handleSeatChange}
          />

          <div className="update-cost" data-testid="cost">{this.state.selectedPlan.cost}</div>
        </div>

        <button
          className="update-button"
          disabled={!this.state.updateButtonEnabled}
          onClick={this.handleUpdatePlanClick}
        >
          Update
        </button>
      </div>
    );
  }
}

export default withRouter(PlanUpdate);
