import React from "react";
import PlanUpdate from './updates/PlanUpdate';

const Updates = () => {

  return (
  <div className="update">
    <div className="update-title">Update Subscriptions</div>
    <PlanUpdate product={"Support"} />
  </div>
  )
};

export default Updates;
