import React from 'react';
import PlanConfirm from './PlanConfirm';

const Confirms = () => {

  return (
    <div className="confirm">
      <div className="confirm-title">Plan Change Confirmation</div>
      <PlanConfirm product={"Support"}/>
      <PlanConfirm product={"CRM"} />
    </div>
  );

}

export default Confirms;