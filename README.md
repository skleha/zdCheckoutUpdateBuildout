# Checkout App

#### To View
After cloning to your desktop, open `index.html`.  On my machine, I use VS Code and an extension, LiveServer, so that changes 
to the code render in real time.
<br></br>

#### Brief Summary of the User Experience
The checkout app mimics a self-service flow for a subscription based software product.  On initial render, the user is presented with 
the attributes of their existing plan:  current plan name, current seats and current cost.  The user may alter either the plan or
the number of seats.  Should the user update the plan or the seats, the app will fetch the new cost per seat from a mocked backend
and update the pricing.  Upon change the plan -- and not before -- the user is able to save the new subscription.  These subscription
attributes are saved to the backend, and the user is served a confirmation page.  This confirmation page shows both previous and current
subscription data, with new data highlighted in a different font color.  The user may then click on the "Back" button to render the
initial subscription update page.  The new subscription is displayed and the process can begin again.

#### Key Specifications
* The app should display the existing subscription information upon load (fetched from the
`/api/current` endpoint).
* Changing any of the subscription details (plan or seats) should show the price of the
updated subscription (fetched from the `/api/preview` endpoint).
* The update button should be disabled unless previewing a subscription that is different
from the existing subscription. In other words, the app should not allow an update if the
subscription has not been changed.
* Clicking on the 'Update' button should update the subscription by submitting a PUT
request to the `/api/current` endpoint.
* A successful submission should display a confirmation screen showing both the previous
and updated subscription details. The updated details that differ from the previous
subscription should be highlighted.
* The confirmation screen should include a 'Back' button which shows the subscription
screen again with updated subscription data.

#### Key Technologies and Dependencies
* __React.__  Two main components, `SupportUpdate.jsx` and `SupportConfirm.jsx`, accessed via two different
frontend routes, "/" and "/confirm".  These two components are rendered in two shell components, 
`Updates.jsx` and `Confirms.jsx`.  The motivating idea in this structure is that more products may be
easily added to the app.  For instance, the `Updates.jsx` shell component could feature, in addition to 
`SupportUpdate.jsx`, two other products named `CRMUpdate.jsx` or `ChatUpdate.jsx`, etc.
* __Redux.__  The redux store is not heavily used in this instance of the application; however,
the store may figure prominently into any enhancements or extensions of the core functionality.  The shape of the
store currently looks like:

```
{
    support: {  currentPlan: { plan: 'best', name: 'Best', seats: 5, cost: 5000 }, 
                previousPlan: { plan: 'good', name: 'Good', seats: 5, cost: 50 },
                availablePlans: { basic: "Basic", good: "Good", better: "Better", best:"Best" }
             }
}
```
* __Mockjax.__ A fake backend is provided by Mockjax.  There are five APIs, and they include:

    GET to "/api/current" fetches the current subscription<br>
    PUT to "/api/current" stores the current plan in previous plan, and replaces the currrent subscription with the payload<br>
    GET to "/api/previous" fetches the previous subscription<br>
    GET to "/api/support/plans" fetches the availble plans for the "Support" product line<br>
    GET to "/api/preview" fetches the pricing for a given plan / seat combination<br>
    
* __Webpack / Babel.__


#### The Testing Suite
To run the testing suite, navigate to the root in terminal and `npm run test`.  An effort was made 
to design tests that cover the core specifications identified above. 
