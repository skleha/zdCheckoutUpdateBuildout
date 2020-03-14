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
