import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as SubscriptionHelpers from '../frontend/helpers/supportHelpers';
import { cleanup, fireEvent, render, wait, getByPlaceholderText, getByTestId, waitForDomChange } from '@testing-library/react';
import SupportPlan from '../frontend/models/SupportPlan';
import SupportUpdate from '../frontend/components/updates/SupportUpdate';
import SupportConfirm from '../frontend/components/confirms/SupportConfirm';
import * as SubscriptionConstants from '../frontend/constants/constants';
import configureStore from '../frontend/store/store';



describe('Core specification tests', () => {
  afterEach(cleanup);

  let bestPlan, goodPlan;

  beforeAll(() => {
    bestPlan = new SupportPlan("best", "Best", 5, 5000);
    goodPlan = new SupportPlan("good", "Good", 5, 50);
  })
 

  it('App displays current subscription information upon load of update page', async () => {
    
    const { getByTestId } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => { return SubscriptionConstants.plansAndNames }}
        fetchCurrentPlan={() => { return goodPlan }}
      />
      )
      
      await wait(() => getByTestId("seats-select"))
      const plan = getByTestId('plan-select')
      const seats = getByTestId("seats-select")      
      const cost = getByTestId("cost")
      
      expect(plan.value).toBe("good");
      expect(seats.value).toBe("5")
      expect(cost.innerHTML).toBe("50");
  })


  it("App sends correct data to api/preview", async () => {
    
    // Mock fetchPlanPricing method
    const mockFetchPlanPricing = jest.fn();
    mockFetchPlanPricing.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          cost: 5000
        });
      })
    );

    // Mock updateCurrentPlan method
    const mockUpdateCurrentPlan = jest.fn();
    mockUpdateCurrentPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(bestPlan);
      })
    );

    const component = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={mockFetchPlanPricing}
        updateCurrentPlan={mockUpdateCurrentPlan}
        history={[]}
      />
    );

    // Confirm that current plan is set to 'good'
    await wait(() => component.getByText(/good/i));
    let plans = component.getByTestId("plan-select");
    expect(plans.value).toBe("good");

    // Select best plan from dropdown menu
    fireEvent.change(component.getByTestId("plan-select"), {
      target: { value: "best" }
    });

    // Validate that we're sending the correct data payload
    const [
      mockFetchPlan,
      mockFetchSeats
    ] = mockFetchPlanPricing.mock.calls.pop();

    expect(mockFetchPlan).toBe("best");
    expect(mockFetchSeats).toBe(5);

  });


  it("App updates cost on plan change", async () => {
    // Mock fetchPlanPricing method
    const mockFetchPlanPricing = jest.fn();
    mockFetchPlanPricing.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          cost: 5000
        });
      })
    );

    // Mock updateCurrentPlan method
    const mockUpdateCurrentPlan = jest.fn();
    mockUpdateCurrentPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(bestPlan);
      })
    );

    const component = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={mockFetchPlanPricing}
        updateCurrentPlan={mockUpdateCurrentPlan}
        history={[]}
      />
    );

    // Confirm that current plan is set to 'good'
    await wait(() => component.getByText(/good/i));
    let plans = component.getByTestId("plan-select");
    expect(plans.value).toBe("good");

    // Select best plan from dropdown menu
    fireEvent.change(component.getByTestId("plan-select"), {
      target: { value: "best" }
    });

    // Validate that the cost and plan selection has been updated
    await wait(() => component.getByText("5000"));
    const cost = component.getByTestId("cost").innerHTML;
    expect(cost).toBe("5000");
    expect(component.getByTestId("plan-select").value).toBe("best");

  });


  it("App updates cost on seat change", async () => {
    const { getByTestId } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={() => {
          return { cost: 100 };
        }}
      />
    );

    // Get seats input and cost div
    await wait(() => getByTestId("seats-select"));
    const seats = getByTestId("seats-select");
    const cost = getByTestId("cost");

    // Change the number of seats
    fireEvent.change(seats, {
      target: { value: 10 }
    });

    // Confirm cost has changed to the fetched price
    await waitForDomChange({ seats });
    expect(seats.value).toBe("10");
    expect(cost.innerHTML).toBe("100");
  });


  it("On plan change and \'Update\' click, app sends correct data to api/current", async () => {
    // Mock fetchPlanPricing method
    const mockFetchPlanPricing = jest.fn();
    mockFetchPlanPricing.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          cost: 5000
        });
      })
    );

    // Mock updateCurrentPlan method
    const mockUpdateCurrentPlan = jest.fn();
    mockUpdateCurrentPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          plan: "best",
          name: "Best",
          seats: 5,
          cost: 5000
        });
      })
    );

    const component = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={mockFetchPlanPricing}
        updateCurrentPlan={mockUpdateCurrentPlan}
        history={[]}
      />
    );

    // Confirm that current plan is set to 'good'
    await wait(() => component.getByText(/good/i));
    let plans = component.getByTestId("plan-select");
    expect(plans.value).toBe("good");

    // Select best plan from dropdown menu
    fireEvent.change(component.getByTestId("plan-select"), {
      target: { value: "best" }
    });


    // Update button is enabled
    const button = component.getByText("Update");
    await waitForDomChange({ button });
    expect(button.disabled).toBe(false);

    // Click update button
    fireEvent.click(button);

    // Validate that we're sending the correct data payload
    const [mockUpdatePlan] = mockUpdateCurrentPlan.mock.calls.pop();
    expect(mockUpdatePlan.plan).toBe("best");
    expect(mockUpdatePlan.name).toBe("Best");
    expect(mockUpdatePlan.seats).toBe(5);
    expect(mockUpdatePlan.cost).toBe(5000);
  });


  it('App loads with update button disabled', async () => {
    const { getByText } = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {}}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
      />
    )

    await wait(() => getByText('Update'))
    const button = getByText('Update')

    expect(button.disabled).toBe(true)
  })



  it("Upon two changes, one to a new plan, and another BACK to current plan, update button is disabled", async () => {

    // Mock fetchPlanPricing method
    const mockFetchPlanPricing = jest.fn();
    mockFetchPlanPricing.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          cost: 5000
        });
      })
    );    

    const component = render(
      <SupportUpdate
        plansAndNames={SubscriptionConstants.plansAndNames}
        currentPlan={goodPlan}
        fetchAvailablePlans={() => {
          return SubscriptionConstants.plansAndNames;
        }}
        fetchCurrentPlan={() => {
          return goodPlan;
        }}
        fetchPlanPricing={mockFetchPlanPricing}
      />
    );

    // Confirm that current plan is set to 'good'
    await wait(() => component.getByText(/good/i));
    let plans = component.getByTestId("plan-select");
    expect(plans.value).toBe("good");

    // Select best plan from dropdown menu
    fireEvent.change(component.getByTestId("plan-select"), {
      target: { value: "best" }
    });

    // Update button should enabled
    let button = component.getByText("Update");
    await waitForDomChange({ button });
    expect(button.disabled).toBe(false);

    // Select best plan from dropdown menu
    fireEvent.change(component.getByTestId("plan-select"), {
      target: { value: "good" }
    });

    // Update button should disabled
    button = component.getByText("Update");
    await waitForDomChange({ button });
    expect(button.disabled).toBe(true);

  });

  
  it('The confirmation screen loads showing both previous and updated subscription details', async () => {
    
    // Mock fetchPreviousPlan function
    const mockFetchPreviousPlan = jest.fn();
    mockFetchPreviousPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({plan: "good", name: "Good", seats: 5, cost: 500});
      })
    );
    
    const component = render(
      <SupportConfirm
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={mockFetchPreviousPlan}
      />
    )

    // Scrape component for values
    await wait(() => component.getByTestId('previous-name'));
    let previousName = component.getByTestId('previous-name');
    let previousSeats = component.getByTestId('previous-seats');
    let previousCost = component.getByTestId('previous-cost');
    let currentName = component.getByTestId('current-name');
    let currentSeats = component.getByTestId('current-seats');
    let currentCost = component.getByTestId('current-cost');
    
    // Compare values with expected
    expect(previousName.innerHTML).toBe("Good");
    expect(previousSeats.innerHTML).toBe("5");
    expect(previousCost.innerHTML).toBe("50");
    expect(currentName.innerHTML).toBe("Best");
    expect(currentSeats.innerHTML).toBe("5");
    expect(currentCost.innerHTML).toBe("5000");

  })


  it('Updated details that differ from previous subscription have \'changed\' classname', async () => {

    // Mock fetchPreviousPlan function
    const mockFetchPreviousPlan = jest.fn();
    mockFetchPreviousPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({ plan: "good", name: "Good", seats: 5, cost: 500 });
      })
    );

    const component = render(
      <SupportConfirm
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={mockFetchPreviousPlan}
      />
    )

    // Scrape component for values
    await wait(() => component.getByTestId('current-name'));
    let currentName = component.getByTestId('current-name');
    let currentSeats = component.getByTestId('current-seats');
    let currentCost = component.getByTestId('current-cost');

    // Compare values with expected
    expect(currentName.classList.contains('changed')).toBe(true);
    expect(currentSeats.classList.contains('changed')).toBe(false);
    expect(currentCost.classList.contains('changed')).toBe(true);
    
  })


  it('The confirmation screen should include a \'Back\' button', async () => {
    
    const { getByTestId } = render(
      <SupportConfirm 
        currentPlan={bestPlan}
        previousPlan={goodPlan}
        fetchPreviousPlan={() => {return goodPlan }}
      />
    )

    await wait(() => getByTestId("back-button"));
    const button = getByTestId("back-button");

    expect(button).toBeDefined();
  })


})


describe('Navigation test', () => {
  let bestPlan, goodPlan, history, location, store;

  beforeAll(() => {
    bestPlan = new SupportPlan('best', 'Best', 5, 5000);
    goodPlan = new SupportPlan('good', 'Good', 5, 50);
    store = configureStore();
    history = createBrowserHistory();
  })


  test('When \'Update\' is clicked, confirmation page is rendered', async () => {
    
    // Create mock promises
    const mockFetchCurrentPlan = jest.fn();
    mockFetchCurrentPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({ plan: 'good', name: 'Good', seats: 5, cost: 50 });
      })
    )

    const mockFetchPreviousPlan = jest.fn();
    mockFetchPreviousPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        const plan = new SupportPlan('good', 'Good', 5, 5000);
        store.dispatch({
          type: 'RECEIVE_PREVIOUS_PLAN',
          prevPlan: plan,
        });
        resolve(plan);
      })
    )

    const mockFetchPlanPricing = jest.fn();
    mockFetchPlanPricing.mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          cost: 5000,
        });
      })
    )

    const mockUpdateCurrentPlan = jest.fn();
    mockUpdateCurrentPlan.mockReturnValue(
      new Promise((resolve, reject) => {
        const plan = new SupportPlan('best', 'Best', 5, 5000)
        store.dispatch({
          type: 'RECEIVE_CURRENT_PLAN',
          currPlan: plan,
        })
        resolve(plan);
      })
    )

    history.push('/')

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <Route
            path="/"
            render={({ history }) => {
              return (
                <SupportUpdate
                  history={history}
                  currentPlan={goodPlan}
                  plansAndNames={SubscriptionConstants.plansAndNames}
                  fetchCurrentPlan={mockFetchCurrentPlan}
                  fetchAvailablePlans={() => {
                    return SubscriptionConstants.plansAndNames
                  }}
                  fetchPlanPricing={mockFetchPlanPricing}
                  updateCurrentPlan={() => {
                    history.push('/confirm')
                  }}
                />
              )
            }}
          />
          <Route
            path="/confirm"
            render={({ history }) => {
              return (
                <SupportConfirm
                  history={history}
                  currentPlan={bestPlan}
                  previousPlan={goodPlan}
                  fetchPreviousPlan={mockFetchPreviousPlan}
                />
              )
            }}
          />
        </Router>
      </Provider>
    )

    // Change plan on subscription update
    await wait(() => component.getByText('Update'));
    fireEvent.change(component.getByTestId('seats-select'), {
      target: { value: 10 },
    });

    // Wait until 'Update' button is enabled; click on 'Update'
    const button = component.getByText('Update');
    await wait(() => (component.getByText('Update').disabled = false));
    fireEvent.click(button);

    // Wait until confirm page renders; ensure that update page *has* rendered
    await wait(() => component.getByText('Updated Subscription'));
    const newPage = component.getByText('Updated Subscription');
    expect(newPage.innerHTML).toContain('Updated Subscription');
  })

})



describe("Test hasChangedSubscriptions helper function", () => {
  let plan, samePlan, differentPlan, differentSeats, differentSeatsAndPlan;

  beforeAll(() => {
    plan = new SupportPlan("best", "Best", 5, 5000);
    samePlan = new SupportPlan("best", "Best", 5, 5000);
    differentPlan = new SupportPlan("good", "Good", 5, 50);
    differentSeats = new SupportPlan("best", "Best", 10, 10000);
    differentSeatsAndPlan = new SupportPlan("good", "Good", 10, 100);
  });

  test("hasSubscriptionChanged should yield all falses when same plan", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, samePlan);

    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(false);
  });

  test("hasSubscriptionChanged should yield all trues when plan and seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentSeatsAndPlan);

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when plan is changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentPlan);

    expect(hasPlanChanged).toBe(true);
    expect(hasSeatsChanged).toBe(false);
    expect(hasCostChanged).toBe(true);
  });

  test("hasSubscriptionChanged should yield two trues when seats are changed", () => {
    const {
      hasPlanChanged,
      hasSeatsChanged,
      hasCostChanged
    } = SubscriptionHelpers.hasSubscriptionChanged(plan, differentSeats);

    expect(hasPlanChanged).toBe(false);
    expect(hasSeatsChanged).toBe(true);
    expect(hasCostChanged).toBe(true);
  });
});

