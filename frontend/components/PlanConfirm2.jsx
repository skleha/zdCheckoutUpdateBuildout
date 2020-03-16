import React, { useState, useEfect } from "react";
import classNames from 'classnames'
import * as helperFuncs from "../helpers/helperFuncs";
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";
import { withRouter } from "react-router";


function PlanConfirm(props) {

  if (props.previousSub === "") return null;

  const handleBackClick = async (e) => {
    await SubscriptionAPIUtil.deletePreviousPlan();
    this.props.history.push('/');
  }

  const {
    hasPlanChanged,
    hasSeatsChanged,
    hasCostChanged
  } = helperFuncs.hasSubscriptionChanged(props.previousSub, props.currentSub);

  const planChangeClassName = classNames("confirm-grid-data", {
    changed: hasPlanChanged
  });
  const seatChangeClassName = classNames("confirm-grid-data", {
    changed: hasSeatsChanged
  });
  const costChangeClassName = classNames("confirm-grid-data", {
    changed: hasCostChanged
  });

  return ( 
    <div className="confirm-component">
      <div className="confirm-title"></div>
      <div className="confirm-grid-container">
        <div className="confirm-grid-title">{`${props.product} Plan`}</div>
        <div className="confirm-grid-header">Previous Subscription</div>
        <div className="confirm-grid-header">Updated Subscription</div>
        <div className="confirm-grid-title">Plan Name</div>
        <div className="confirm-grid-data" data-testid="previous-name">{props.previousSub.name}</div>
        <div className={planChangeClassName} data-testid="current-name">{props.currentSub.name}</div>
        <div className="confirm-grid-title">Seats</div>
        <div className="confirm-grid-data" data-testid="previous-seats">{props.previousSub.seats}</div>
        <div className={seatChangeClassName} data-testid="current-seats">{props.currentSub.seats}</div>
        <div className="confirm-grid-title">Cost</div>
        <div className="confirm-grid-data" data-testid="previous-cost">{props.previousSub.cost}</div>
        <div className={costChangeClassName} data-testid="current-cost">{props.currentSub.cost}</div>
      </div>
      <button
        className="confirm-back-button"
        data-testid="back-button"
        onClick={handleBackClick}>
          Back
      </button>
    </div>
  );
}

export default withRouter(PlanConfirm);