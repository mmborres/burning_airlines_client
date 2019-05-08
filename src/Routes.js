import React from 'react';
// To save headaches, the HashRouter is preferred to BrowserRouter.
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Airplane from './components/Airplane';
import Flights from './components/Flights';
import Reservation from './components/Reservation';
import Search from './components/Search';
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";

// Not a functional component -- it's just some JSX
const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/airplanes" component={ Airplane } />
      <Route path="/flights" component={ Flights } />
      <Route path="/search" component={ Search } />
      <Route path="/flight/:id" component={ Reservation } />
      <Route path="/reservation" component={ Reservation } />
<<<<<<< HEAD
      <Route path="/home" component={Home} />

=======
      <Route path="/reservation" component={ Reservation } />
>>>>>>> 2b753e11bc2d2fcce7700711b6a48ebf68173770
    </div>
  </Router>
);

// export default ({ childProps }) =>
//   <Switch>
//     <AppliedRoute path="/" exact component={Home} props={childProps} />
//     <AppliedRoute path="/login" exact component={Login} props={childProps} />
//     { /* Finally, catch all unmatched routes */ }
//     <Route component={NotFound} />
//   </Switch>;

export default Routes;
