import React, { useState, useEffect } from 'react';
import * as SubscriptionAPIUtil from '../utils/subscription_api_util';
import PlanConfirm from './PlanConfirm2';

const Confirms = () => {

  const [currSupportSub, setCurrSupportSub] = useState({});
  const [prevSupportSub, setPrevSupportSub] = useState({});
  const [currCrmSub, setCurrCrmSub] = useState({});
  const [prevCrmSub, setPrevCrmSub] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchAllData = async () => {

      const apiResponse = await Promise.all([
        SubscriptionAPIUtil.fetchCurrentPlan('Support'),
        SubscriptionAPIUtil.fetchPreviousPlan('Support'),
        SubscriptionAPIUtil.fetchCurrentPlan('CRM'),
        SubscriptionAPIUtil.fetchPreviousPlan('CRM'),
      ])

      // Set state with result from API call
      const [currSupport, prevSupport, currCrm, prevCrm] = apiResponse;
      setCurrSupportSub(currSupport);
      setPrevSupportSub(prevSupport);
      setCurrCrmSub(currCrm);
      setPrevCrmSub(prevCrm);
      setIsLoading(false);
    }

    fetchAllData();

  }, []);

  if (isLoading) {

    return ("Loading...");
  
  } else {

    return (
      <div className="confirm">

        <div className="confirm-title">Plan Change Confirmation</div>
        
        <PlanConfirm
          product={"Support"}
          previousSub={prevSupportSub}
          currentSub={currSupportSub}/>

        <PlanConfirm
          product={"CRM"}
          previousSub={prevCrmSub}
          currentSub={currCrmSub} />
        
      </div>
    );

  }

}

export default Confirms;