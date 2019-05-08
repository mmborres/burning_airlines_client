import React from 'react';
// To save headaches, the HashRouter is preferred to BrowserRouter.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Airplane from './components/Airplane';
import Flights from './components/Flights';
import Reservation from './components/Reservation';
import Search from './components/Search';

// Not a functional component -- it's just some JSX
const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/airplanes" component={ Airplane } />
      <Route path="/flights" component={ Flights } />
      <Route path="/search" component={ Search } />
      <Route path="/flight/:id" component={ Reservation } />
    </div>
  </Router>
);

export default Routes;
