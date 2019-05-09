import React, {Component} from 'react';
import axios from 'axios'; // installed with: npm install axios
//import _ from 'underscore';
import './../App.css';
import { Link } from 'react-router-dom';


const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/flights.json';

class Search extends Component {
  constructor() {
    super();
    this.state = { flights: [] };
    this.fetchFlights = this.fetchFlights.bind(this); 
  }

  fetchFlights = (from, to) => {
    console.log('Searching Flights from: ', from);
    console.log('And to: ', to);

    axios.get(SERVER_URL).then((results) => {

      //console.log(results.data);
      //set-up display

      const f_in = results.data;
      const listflights = [];

      for(let i=0; i<f_in.length; i++) {
        const flight = f_in[i];
        //console.log(flight.origin);
        if ( flight.origin===from && flight.destination===to ) {
          listflights.push(flight); 
        }
      }
      
      console.log("listflights=" + listflights);
      this.setState({ flights: listflights });
    });
  };


  render() {
    return (
      <div className="App">
        <SearchForm onSubmit={ this.fetchFlights } />
        <Flights flights={ this.state.flights } />
      </div>
    );
  }
};

////
//{ props.flights.map( (flight) => <a href={flight.url} target="_blank" key={flight.id} rel="noopener noreferrer"> {flight.flightnumber} </a>)}
    
const Flights = (props) => {
  //console.log("inside Flights = " + props.flights.length); //.flights.url);
  if (props.flights.length === 0) {
    return ''; // no results to show yet
  } else {
  return (
    <div>
      <br />
      Flights: <br />
      { props.flights.map( (flight) => <Link to={ "/flight/" + flight.id + "/" + flight.plane_id }>{flight.flightnumber}</Link> )}
    </div>
  )
  }
};

/////

class SearchForm extends Component {
  constructor() {
    super();
    this.state = { from: '', to: '' };
    this._handleInputFrom = this._handleInputFrom.bind(this);
    this._handleInputTo = this._handleInputTo.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInputFrom(event) {
    this.setState({from: event.target.value});
  }

  _handleInputTo(event) {
    this.setState({to: event.target.value});
  }
  
  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit( this.state.from, this.state.to ); //fetchFlights = (from, to)
  }

  render() {
    return (
      <div>
      <form onSubmit={ this._handleSubmit }>
        Search Flights <br/>
        From: <input type="search" placeholder="Sydney" required onInput={ this._handleInputFrom } />
        To: <input type="search" placeholder="Melbourne" required onInput={ this._handleInputTo } />
        <input type="submit" value="Search" />
      </form>
      <p>
      <Link to="/home">Back to Home</Link>
      </p>
      </div>
    );
  }
}




export default Search;
