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
        <button onclick="FlightForm">Create New Flight</button> //created a button to show "Create new flight" form on click --doesn't work
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
    this.state = { date: '' };
    this.state = { from: '' };
    this.state = { to: '' };
    this.state = { plane: '' };
    this.state = { seats: '' };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.flight);
    this.setState({flight: ''});
    this.setState({date: ''});
    this.setState({from: ''});
    this.setState({to: ''});
    this.setState({plane: ''});
    this.setState({seats: ''});
  }

  _handleChange(e) {
    this.detState({ flight: e.target.value,
      date: e.target.value,
      from: e.target.value,
      to: e.target.value,
      plane: e.target.value,
      seats: e.target.value});
  }

  // render() {
  //   return(
  //     <form onSubmit={ this._handleSubmit }>
  //       <textarea onChange={ this._handleChange } value={ this.state.flight }placeholder="Flight number"></textarea>
  //       <textarea onChange={ this._handleChange } value={ this.state.date } placeholder="Date"></textarea>
  //       <textarea onChange={ this._handleChange } value={ this.state.from } placeholder="Origin"></textarea>
  //       <textarea onChange={ this._handleChange } value={ this.state.to } placeholder="Destination"></textarea>
  //       <textarea onChange={ this._handleChange } value={ this.state.plane } placeholder="Plane type"></textarea>
  //       <textarea onChange={ this._handleChange } value={ this.state.seats } placeholder="# Seats"></textarea>
  //       <input type="submit" value="Save Flight" />
  //     </form>
  //   );
  // }
  render() { //render for create new flight form
    return (
      <form onSubmit={ this._handleSubmit }>
        <label>
          Flight:
          <input
            name="flight"
            type="text"
            onChange={this._handleChange}
            value={ this.state.flight } />
        </label>
        <label>
          Date:
          <input
            name="date"
            type="text"
            value={this.state.date}
            onChange={this._handleChange} />
        </label>
        <label>
          From:
          <input
            name="from"
            type="text"
            value={this.state.from}
            onChange={this._handleChange} />
        </label>
        <label>
          To:
          <input
            name="to"
            type="text"
            value={this.state.to}
            onChange={this._handleChange} />
        </label>
        <label>
          Plane:
          <input
            name="plane"
            type="text"
            value={this.state.plane}
            onChange={this._handleChange} />
        </label>
        <label>
          Seats:
          <input
            name="seats"
            type="number"
            value={this.state.seats}
            onChange={this._handleChange} />
        </label>
        <input type="submit" value="Save Flight" />
      </form>
    );
  }
}

class Gallery extends Component {
  render() {
    return (
      <div>
      <h2>Flights</h2>
        <table>
          <th>Flight</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th>
          <th>Plane</th>
          <th>Seats</th>
{this.props.flights.map((f) =>
  <tbody>
  <tr>
    <td>{f.flight}</td>
    <td>{f.from}</td>
    <td>{f.to}</td>
    <td>{f.date}</td>
    <td>{f.plane}</td>
    <td>{f.seats}</td>
  </tr>
  </tbody>)}
</table>
      </div>

    );
  }
}

export default Flights;
