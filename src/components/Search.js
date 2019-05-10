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

  fetchFlights = (f, t) => {
    const from = f.toUpperCase();
    const to = t.toUpperCase();
    console.log('Searching Flights from: ', from);
    console.log('And to: ', to);

    axios.get(SERVER_URL).then((results) => {

      console.log(results.data);
      //set-up display

      const f_in = results.data;
      const listflights = [];

      for(let i=0; i<f_in.length; i++) {
        const flight = f_in[i];
        //console.log(flight);

        if (from==="" && to==="") { //all flights
          listflights.push(flight); 
        } else if (from!=="" && to==="") {
          //TO is empty
          if ( ( (flight.origin!==null && flight.origin.toUpperCase()===from) || flight.origin_code===from ) ) {
            //console.log('flight added')
            listflights.push(flight); 
          }
        } else if (to!=="" && from==="") {
          //FROM is empty
          if ( ( (flight.destination!==null && flight.destination.toUpperCase()===to) || flight.destination_code===to) ) {
            //console.log('flight added')
            listflights.push(flight); 
          }
        } else {
          if ( (flight.origin.toUpperCase()===from || flight.origin_code===from) && 
            (flight.destination.toUpperCase()===to || flight.destination_code===to) ) {
              //console.log('flight added')
              listflights.push(flight); 
          }
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
/*  return (
    <div>
      <br />
      Flights: <br />
      { props.flights.map( (flight) => <Link to={ "/flight/" + flight.id + "/" + flight.plane_id }>{flight.flightnumber}</Link> )}
    </div>
    )
    */
////
  const flightsSortedByDate = props.flights;
  flightsSortedByDate.sort( function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
    return new Date(a.flightdate) - new Date(b.flightdate);
  });

return (
  <div className="flights">
  <h2>Flights</h2>
    <table className="flighttable">
      <th>Flight</th>
      <th>From</th>
      <th>To</th>
      <th>Date</th>
      <th>Plane</th>
      <th>Seats</th>
{flightsSortedByDate.map((f) =>
<tbody key={f.id + 1}>
<tr key={f.id + 2}>
<td key={f.id + 3}><Link to={ "/flight/" + f.id + "/" + f.plane_id }>{f.flightnumber}</Link></td>
<td key={f.id + 4}>{f.origin_code}</td>
<td key={f.id + 5}>{f.destination_code}</td>
<td key={f.id + 6}>{f.flightdate}</td>
<td key={f.id + 7}>{f.planename}</td>
<td key={f.id + 8}>{f.seats}</td>
</tr>
</tbody>)}
</table>
  </div>

);
  } //end
////
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
      <h1> Search Flights</h1>
      <form onSubmit={ this._handleSubmit }>
         <br/>
        From: <input type="search" placeholder="Sydney" defaultValue="" onInput={ this._handleInputFrom } />
        To: <input type="search" placeholder="Melbourne" defaultValue="" onInput={ this._handleInputTo } />
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
