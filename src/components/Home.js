import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import UserProfile from './UserProfile';

const Home = () => {
  const admin = UserProfile.isAdmin() === true;
  console.log("Home=" + UserProfile.isAdmin());
  if (admin) {
    return (
      <div className="App">
        <h2>Welcome To Powerpuff Airlines</h2>
        <p>
          <Link to="/airplanes">Airplanes</Link>
        </p>
        <p>
          <Link to="/flights">All Flights</Link>
        </p>
        <p>
          <Link to="/search">Search Flights</Link>
        </p>
      </div>
    )
  } else {
    return (
      <div className="App">
        <h2>Welcome To Powerpuff Airlines</h2>
        <p>
          <Link to="/flights">All Flights</Link>
        </p>
        <p>
          <Link to="/search">Search Flights</Link>
        </p>
      </div>
    )
  }
  
};

export default Home;
