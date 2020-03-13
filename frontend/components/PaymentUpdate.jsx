import React from 'react';



function PaymentUpdate(props) {




  return (
    <div className="payment-update">
      <div className="payments-title">Update Payment Information</div>
      
      <div className="payment-inputs-div">
        <input className="payment-input" id="credit-card-no" type="text" />
        <input className="payment-input" id="credit-card-exp" type="text" />
        <input className="payment-input" id="credit-card-cvv" type="text" />
      </div>

    </div>
  )

}

export default PaymentUpdate;

