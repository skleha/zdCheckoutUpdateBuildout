
const PLAN_COSTS_USD = {
  basic: 1,
  good: 10,
  better: 100,
  best: 1000
};

const PLAN_NAMES = {
  basic: "Basic",
  good: "Good",
  better: "Better",
  best: "Best"
};

let prevSubscription = "";

let currSubscription = {
  plan: "good",
  name: "Good",
  seats: 5,
  cost: 50
};

$.mockjax({
  url: "/api/current",
  type: "GET",
  response: function() {
    this.responseText = currSubscription;
  }
});


// Mock error message
// $.mockjax({
//   url: "/api/current",
//   type: "GET",
//   status: 500,
//   responseText: "Internal Server Error"
// });


$.mockjax({
  url: "/api/previous",
  type: "GET",
  response: function() {
    this.responseText = prevSubscription;
  }
});

$.mockjax({
  url: "/api/previous",
  type: "DELETE",
  response: function () {
    const deletedSub = prevSubscription;
    prevSubscription = "";
    this.responseText = deletedSub;
  }
});

$.mockjax({
  url: "/api/support/plans",
  type: "GET",
  responseText: PLAN_NAMES
});

$.mockjax({
  url: "/api/preview",
  type: "GET",
  response: function(request) {
    this.responseText = {
      cost: request.data.seats * PLAN_COSTS_USD[request.data.plan]
    };
  }
});

$.mockjax({
  url: "/api/current",
  type: "PUT",
  response: function(request) {
    let newData = {
      plan: request.data.settings.plan,
      name: request.data.settings.name,
      seats: request.data.settings.seats,
      cost: request.data.settings.cost
    };

    prevSubscription = currSubscription;
    currSubscription = newData;
    this.responseText = currSubscription;
  }
});


//------------------------------------------------

const CRM_PLAN_COSTS_USD = {
  basic: 1,
  good: 10,
  better: 100,
  best: 1000
};

const CRM_PLAN_NAMES = {
  basic: "Basic",
  good: "Good",
  better: "Better",
  best: "Best"
};

let crmPrevSubscription = "";

let crmCurrSubscription = {
  plan: "best",
  name: "Best",
  seats: 1,
  cost: 1000
};

$.mockjax({
  url: "/api/crm",
  type: "GET",
  response: function() {
    this.responseText = crmCurrSubscription;
  }
});

$.mockjax({
  url: "/api/crm/previous",
  type: "GET",
  response: function() {
    this.responseText = crmPrevSubscription;
  }
});

$.mockjax({
  url: "/api/crm/previous",
  type: "DELETE",
  response: function () {
    const deletedSub = crmPrevSubscription;
    crmPrevSubscription = "";
    this.responseText = deletedSub;
  }
});

$.mockjax({
  url: "/api/crm/plans",
  type: "GET",
  responseText: CRM_PLAN_NAMES
});

$.mockjax({
  url: "/api/crm/preview",
  type: "GET",
  response: function(request) {
    this.responseText = {
      cost: request.data.seats * CRM_PLAN_COSTS_USD[request.data.plan]
    };
  }
});

$.mockjax({
  url: "/api/crm/current",
  type: "PUT",
  response: function(request) {
    let newData = {
      plan: request.data.settings.plan,
      name: request.data.settings.name,
      seats: request.data.settings.seats,
      cost: request.data.settings.cost
    };

    crmPrevSubscription = crmCurrSubscription;
    crmCurrSubscription = newData;
    this.responseText = crmCurrSubscription;
  }
});


//------------------------------------------------

let currPaymentInfo = { 
  number: "1234567890123456",
  exp: "5/23",
  cvv: "813"
}

$.mockjax({
  url: "/api/payment",
  type: "GET",
  response: function() {
    this.responseText = currPaymentInfo;
  }
});
