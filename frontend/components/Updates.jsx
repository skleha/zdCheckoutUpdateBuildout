import React, { useState, useEffect } from "react";
import PlanUpdate from './PlanUpdate';
import { Link } from 'react-router-dom';
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";


const Updates = (props) => {

  const [currSupportSub, setCurrSupportSub] = useState({});
  const [selectSupportSub, setSelectSupportSub] = useState({});
  const [supportPlans, setSupportPlans] = useState({});
  const [currCrmSub, setCurrCrmSub] = useState({});
  const [selectCrmSub, setSelectCrmSub] = useState({});
  const [crmPlans, setCrmPlans] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);


  // On mounting, useEffect calls fetchAllData and sets state
  // On remounting, useEffect toggles update button  disable
  useEffect(() => {
    
    if (isLoading) {

      fetchAllData();
    
    } else {
      
      if (selectSupportSub.plan === undefined && 
          selectCrmSub.plan === undefined) {
            setUpdateButtonEnabled(false);
          } else {
            setUpdateButtonEnabled(true);
          }
    }
    
  }, [selectSupportSub, selectCrmSub]);


  // fetchAllData fires API requests in parallel and then sets state
  // Need error handling for backend error
  const fetchAllData = async () => {

    const apiResponse = await Promise.all([
      SubscriptionAPIUtil.fetchCurrentPlan('Support'),
      SubscriptionAPIUtil.fetchAvailablePlans('Support'),
      SubscriptionAPIUtil.fetchCurrentPlan('CRM'),
      SubscriptionAPIUtil.fetchAvailablePlans('CRM')
    ])

    const [currSupportSub, supportPlans, currCrmSub, crmPlans] = apiResponse;
    setCurrSupportSub(currSupportSub);
    setSupportPlans(supportPlans);
    setCurrCrmSub(currCrmSub);
    setCrmPlans(crmPlans);
    setIsLoading(false);
  }

  // handleUpdateClick fires API calls and sets the current subscription
  const handleUpdateClick = async () => {
    
    if (selectSupportSub.plan !== undefined) {
      await SubscriptionAPIUtil.updateCurrentSub("Support", selectSupportSub);
    }
    
    if (selectCrmSub.plan !== undefined) {
      await SubscriptionAPIUtil.updateCurrentSub("CRM", selectCrmSub);
    }

    props.history.push("/confirm");
  }
  

  // Return 'loading' on mounting of component
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
          onNewSubSelect={setSelectSupportSub}
        />

        <PlanUpdate
          product={"CRM"}
          currentSub={currCrmSub}
          plansAndNames={crmPlans}
          onNewSubSelect={setSelectCrmSub}
        />

        <button
          className="update-button"
          disabled={!updateButtonEnabled}
          onClick={handleUpdateClick}>
          Update
        </button>


      </div>
    );
  }

};

export default Updates;
