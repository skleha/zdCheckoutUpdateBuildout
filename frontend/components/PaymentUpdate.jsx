import React, { useState, useEffect } from 'react';
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";


function PaymentUpdate(props) {

  const [{number, exp, cvv}, setPaymentInfo] = useState({number: 1234, exp: "12/23", cvv: "813"});


  useEffect(() => {
    async function fetchInfo() {
      const paymentInfo = await SubscriptionAPIUtil.fetchPaymentInfo();
      setPaymentInfo(paymentInfo);
    }
    fetchInfo();
    
  }, []);


  return (
    <div className="payment-update">
      <div className="payments-title">Update Payment Information</div>
      
      <div className="payment-inputs-div">
        <label className="payment-label" htmlFor="credit-card-no">Credit Card Number:</label>
          <input 
          className="payment-input" 
          id="credit-card-no" 
          type="text" 
          value={number}/>
        <label className="payment-label" htmlFor="credit-card-exp">Expiration (mm/yy)</label>
        <input 
          className="payment-input" 
          id="credit-card-exp" 
          type="text" 
          value={exp}/>
        <label className="payment-label" htmlFor="credit-card-cvv">CVV</label>
        <input 
          className="payment-input" 
          id="credit-card-cvv" 
          type="text" value={cvv}/>
      </div>

    </div>
  )

}

export default PaymentUpdate;

