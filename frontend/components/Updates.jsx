import React from "react";
import PlanUpdate from './PlanUpdate';
import { Link } from 'react-router-dom';


const Updates = () => {

  // populate state


  // handlePlanChange
  // handleSubscriptionChange
  // handleUpdatePlan
  // 

  const handleSeatChange = e => {
    const seats = e.target.value

    handleSubscriptionChange(
      this.state.selectedPlan.plan,
      this.state.selectedPlan.name,
      seats
    )
  }

  
  const handlePlanChange = ({ productType, selectedPlan }) => {
    const product = { ...productSubscriptions[productType] }
    const selectedName = plansAndNames[selectedPlan]

    handleSubscriptionChange({
      productType,
      plan: selectedPlan,
      planName: selectedName,
      seats: product.seats,
    })
  }
  
  const handleSubscriptionChange = async ({
    productType,
    plan,
    planName,
    seats,
  }) => {
    const cost = await fetchProductPricing({ productType, plan, seats })
    const selectedPlan = new CrmPlan(plan, planName, seats, cost) // TODO: use generalized plan class b/c your current plans have same structure

    const currentPlan = productSubscriptions[productType]
    const currentPlanModel = new CrmPlan(
      currentPlan.plan,
      currentPlan.planName,
      currentPlan.seats,
      currentPlan.cost
    )

    const {
      hasPlanChanged,
      hasSeatsChanged,
    } = crmHelper.hasSubscriptionChanged(selectedPlan, currentPlanModel)

    alert(
      `The selected plan name is ${selectedPlan.name} and cost is ${selectedPlan.cost}. The previous plan is ${currentPlanModel.name} and the cost was ${currentPlanModel.cost}. haschanged is ${hasPlanChanged} and hasSeatsChanged is ${hasSeatsChanged}`
    )
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
