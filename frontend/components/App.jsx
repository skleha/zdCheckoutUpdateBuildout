import React from 'react';
import { Route } from 'react-router-dom';
import Updates from './Updates';
import Confirms from './Confirms';

const App = () => (
  <div>
    <Route exact path="/" component={Updates} />
    <Route exact path="/confirm" component={Confirms} />
  </div>
);

export default App;