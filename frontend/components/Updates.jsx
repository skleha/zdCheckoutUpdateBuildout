import React from "react";
import PlanUpdate from './PlanUpdate';
import { Link } from 'react-router-dom';


const Updates = () => {

  // populate state

  
  const handleSeatChange = e => {
    const seats = e.target.value

    handleSubscriptionChange(
      product,
      plan,
      name,
      seats
    )
  }

  
  const handlePlanChange = (product, selectedPlan) => {
    const selectedName = plansAndNames[selectedPlan];

    handleSubscriptionChange({
      productType,
      plan: selectedPlan,
      planName: selectedName,
      seats: product.seats,
    })
  }
  
  const handleSubscriptionChange = async (product, plan, planName, seats) => {
    
    const cost = await fetchProductPricing(product, plan, seats);
    const selectedPlan = new Subscription(plan, planName, seats, cost);
    const currentPlan = this.props.currentPlan;

    const {
      hasPlanChanged,
      hasSeatsChanged,
    } = crmHelper.hasSubscriptionChanged(selectedPlan, currentPlan)

  }

  const handleUpdatePlanClick = async e => {
    await this.props.updateCurrentCrmPlan(this.state.selectedPlan)
    this.props.history.push('/confirm')
  }




  return (
    <div className="update">
      
      <div className="update-header">
        <div className="update-title">Update Subscriptions</div>
        <Link className="link" to="/payment">Update Payment Detail</Link>
      </div>
      
      <PlanUpdate product={"Support"} />
      <PlanUpdate product={"CRM"} />
    </div>
  );
};

export default Updates;
