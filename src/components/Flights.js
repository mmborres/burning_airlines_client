import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/flights.json';

class Flights extends Component {
  constructor() {
    super();
    this.state = {
      flights: [{"id":1,"flight":"87","date":"2013-03-03","from":"JFK", "to":"LAX", "plane":"747", "seats":96},
    {"id":2,"flight":"22","date":"2013-03-04","from":"SVO", "to":"DBX", "plane":"A330", "seats":186}]
    };
    this.saveFlight = this. saveFlight.bind(this);

    const fetchFlights = () => {
      axios.get(SERVER_URL).then((results) => {
        this.setState({flights: results.data});
        setTimeout(fetchFlights, 3000);
      });
    };
    fetchFlights();
  }

  saveFlight(flight) {
    axios.post(SERVER_URL, {flight: flight}).then((result) =>{
      this.setState({flights: [...this.state.flights, result.data]});
    });
  }

  render () {
    return (
      <div>
        <h1>Enter a flight</h1>
        <FlightForm onSubmit={ this.saveFlight}/>
        <Gallery flights={ this.state.flights}/>
      </div>
    );
  }
};

class FlightForm extends Component {
  constructor() {
    super();
    this.state = { flight: '' };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.flight);
    this.setState({content: ''});
  }

  _handleChange(e) {
    this.detState({ flight: e.target.value });
  }

  render() {
    return(
      <form onSubmit={ this._handleSubmit }>
        <textarea onChange={ this._handleChange } value={ this.state.flight }></textarea>
        <input type="submit" value="Flight" />
      </form>
    );
  }
}

class Gallery extends Component {
  render() {
    return (
      <div>
      <h3>Flight From  To  Date  Plane Seats</h3>
      {this.props.flights.map((f) =>

        <ul key={f.id}>
      <li> {f.flight} {f.from} > {f.to}  {f.date}  {f.plane} {f.seats}</li>
        </ul> )}
      </div>
    );
  }
}

export default Flights;
