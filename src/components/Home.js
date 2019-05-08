import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';

const Home = () => {
  const temp = localStorage.getItem('user_id');
			if (temp != null) {
				//user_id = temp; //peer
			}

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

    </div>
  )
};

export default Home;
