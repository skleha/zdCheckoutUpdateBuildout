import React from "react";
import SupportUpdate from './updates/SupportUpdateContainer';

const Updates = () => {

  return (
  <div className="update">
    <div className="update-title">Update Subscriptions</div>
    <SupportUpdate product={"Support"} />
  </div>
  )
};

export default Updates;
