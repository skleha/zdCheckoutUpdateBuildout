import React, { useState, useEffect } from "react";
import PlanUpdate from './PlanUpdate';
import { Link } from 'react-router-dom';
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";


const Updates = () => {

  const [currSupportSub, setCurrSupportSub] = useState({});
  const [supportPlans, setSupportPlans] = useState({});
  const [currCrmSub, setCurrCrmSub] = useState({});
  const [crmPlans, setCrmPlans] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect( () => {
    
    const fetchAllData = async () => {
    
      // Run all fetch requests in parallel
      const apiResponse = await Promise.all([
        SubscriptionAPIUtil.fetchCurrentPlan('Support'),
        SubscriptionAPIUtil.fetchAvailablePlans('Support'),
        SubscriptionAPIUtil.fetchCurrentPlan('CRM'),
        SubscriptionAPIUtil.fetchAvailablePlans('CRM')
      ])

      // Set state with result from API call
      const [currSupportSub, supportPlans, currCrmSub, crmPlans] = apiResponse;
      setCurrSupportSub(currSupportSub);
      setSupportPlans(supportPlans);
      setCurrCrmSub(currCrmSub);
      setCrmPlans(crmPlans);
      setIsLoading(false);
    }

    fetchAllData();

  }, []);

  if (isLoading) {

    return ("Loading...");

  } else {

    return (

      <div className="update">
        
        <div className="update-header">
          <div className="update-title">Update Subscriptions</div>
          <Link className="link" to="/payment">Update Payment Detail</Link>
        </div>
        
        <PlanUpdate
          product={"Support"} 
          currentSub={currSupportSub}
          plansAndNames={supportPlans}
          />
        <PlanUpdate
          product={"CRM"}
          currentSub={currCrmSub}
          plansAndNames={crmPlans}
        />
      </div>
    );
  }

};

export default Updates;
