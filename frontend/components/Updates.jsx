import React from "react";
import PlanUpdate from './updates/PlanUpdate';

const Updates = () => {

  return (
    <div className="update">
      <div className="update-title">Update Subscriptions</div>
      <PlanUpdate product={"Support"} />
      <PlanUpdate product={"CRM"} />
    </div>
  );
};

export default Updates;
