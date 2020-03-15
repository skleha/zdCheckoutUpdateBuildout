
export const fetchCurrentPlan = async (product) => {
   
  switch (product) {
  
    case "Support":
      return await $.ajax({
        url: "/api/current",
        type: "GET"
      });

    case "CRM":
      return await $.ajax({
        url: "/api/crm",
        type: "GET"
      });

    default:
      throw new Error('Invalid product type');

  }
}


export const fetchPreviousPlan = async (product) => {
  
  switch (product) {

    case "Support":
      return await $.ajax({
        url: "/api/previous",
        type: "GET"
      })

    case "CRM":
      return await $.ajax({
        url: "/api/crm/previous",
        type: "GET"
      });
    
    default:
      throw new Error('Invalid product type');

  }
}


export const deletePreviousPlan = async (product) => {

  switch (product) {

    case "Support":
      return await $.ajax({
        url: "/api/previous",
        type: "DELETE"
      })

    case "CRM":
      return await $.ajax({
        url: "/api/crm/previous",
        type: "DELETE"
      });

    default:
      throw new Error('Invalid product type');

  }
}


export const fetchAvailablePlans = async (product) => {

  switch (product) {
  
    case "Support":
      return await $.ajax({
        url: "/api/support/plans",
        type: "GET"
      });

    case "CRM":
      return await $.ajax({
        url: "/api/crm/plans",
        type: "GET"
      });

    default:
      throw new Error('Invalid product type');

  }

}


export const fetchPlanPricing = async (product, plan, seats) => {
  
  switch (product) {
  
    case "Support":
      return await $.ajax({
        url: "/api/preview",
        type: "GET",
        data: { plan, seats }
      });

    case "CRM":
      return await $.ajax({
        url: "/api/crm/preview",
        type: "GET",
        data: { plan, seats }
      });

    default:
      throw new Error('Invalid product type')

  }
}


export const updateCurrentSub = async (product, settings) => {
  
  switch (product) {

  case "Support":
    return await $.ajax({
      url: "/api/current",
      type: "PUT",
      data: { settings }
    });

  case "CRM":
    return await $.ajax({
    url: "/api/crm/current",
    type: "PUT",
    data: { settings }
    });

  default:
    throw new Error('Invalid product type')

  }
}


//=======================


export const fetchPaymentInfo = async () => {
  return await $.ajax({
    url: "/api/payment",
    type: "GET",
  });
}

export const updatePaymentInfo = async (paymentInfo) => {
  return await $.ajax({
    url: "/api/payment",
    type: "PUT",
    data: {paymentInfo}
  });
}