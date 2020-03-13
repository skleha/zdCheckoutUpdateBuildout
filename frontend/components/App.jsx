import React from 'react';
import { Route } from 'react-router-dom';
import Updates from './Updates';
import Confirms from './Confirms';
import PaymentUpdate from './PaymentUpdate';

const App = () => (
  <div>
    <Route exact path="/" component={Updates} />
    <Route exact path="/confirm" component={Confirms} />
    <Route exact path="/payment" component={PaymentUpdate} />
  </div>
);

export default App;