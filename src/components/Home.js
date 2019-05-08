import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';

const Home = () => {
  return (
    <div className="App">
      <h2>Welcome To Power Puff Airlines</h2>
      <p>
        <Link to="/airplanes">Airplanes</Link>
      </p>
      <p>
        <Link to="/flights">All Flights</Link>
      </p>
      <p>
        <Link to="/search">Search Flights</Link>
      </p>
      <p>
        <Link to="/reservation">Search Reservation</Link>
      </p>
    </div>
  )
};

export default Home;
