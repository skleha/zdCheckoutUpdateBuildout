import React, { useState, useEffect } from 'react';
import * as SubscriptionAPIUtil from "../utils/subscription_api_util";


function PaymentUpdate() {

  const [paymentInfo, setPaymentInfo] = useState({number: "", exp: "", cvv: ""});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    
    async function fetchInfo() {
      const data = await SubscriptionAPIUtil.fetchPaymentInfo();
      setPaymentInfo(data);
      setIsloading(false);
    }

    fetchInfo();
  }, []);

  const handleInput = (field) => {
    return (e) => setPaymentInfo({...paymentInfo, [field]: e.target.value});
  }

  const handleSubmit = () => {
    SubscriptionAPIUtil.updatePaymentInfo(paymentInfo);
  }


  if (isLoading) return null;

  return (
    <div className="payment-update">
      <div className="payments-title">Update Payment Information</div>
      
      <div className="payment-inputs-div">
        <label className="payment-label" htmlFor="credit-card-no">Credit Card Number:</label>
          <input 
          className="payment-input" 
          id="credit-card-no" 
          type="text"
          onChange={handleInput("number")}
          value={paymentInfo.number}/>
        <label className="payment-label" htmlFor="credit-card-exp">Expiration (mm/yy)</label>
        <input 
          className="payment-input" 
          id="credit-card-exp" 
          type="text" 
          onChange={handleInput("exp")}
          value={paymentInfo.exp}/>
        <label className="payment-label" htmlFor="credit-card-cvv">CVV</label>
        <input 
          className="payment-input" 
          id="credit-card-cvv" 
          type="text"
          onChange={handleInput("cvv")}
          value={paymentInfo.cvv}/>
      </div>
      <button onClick={handleSubmit}>Update Payment Info</button>
    </div>
    
  )

}

export default PaymentUpdate;

