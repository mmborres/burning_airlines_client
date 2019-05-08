import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/flights.json';

class Flights extends Component {
  constructor() {
    super();
    this.state = {
      flights: []
    };
    this.saveFlight = this.saveFlight.bind(this);

    const fetchFlights = () => {
      axios.get(SERVER_URL).then((results) => {
        this.setState({flights: results.data});
        setTimeout(fetchFlights, 3000);
      });
    };
    fetchFlights();
  }


  saveFlight(flightnumber, flightdate, origin_code, destination_code, planename, seats) {
    axios.post(SERVER_URL, {flightnumber: flightnumber, flightdate: flightdate, origin_code: origin_code, destination_code: destination_code, planename: planename, seats: seats }).then((result) =>{
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
    this.state = { flightnumber: '', flightdate: '' , origin_code: '', destination_code: '', planename: '', seats: '' };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChangeflightnumber = this._handleChangeflightnumber.bind(this);
    this._handleChangeflightdate = this._handleChangeflightdate.bind(this);
    this._handleChangeorigin_code = this._handleChangeorigin_code.bind(this);
    this._handleChangedestination_code = this._handleChangedestination_code.bind(this);
    this._handleChangeplanename = this._handleChangeplanename.bind(this);
    this._handleChangeseats = this._handleChangeseats.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.flight);
    this.setState({flightnumber: ''});
    this.setState({flightdate: ''});
    this.setState({origin_code: ''});
    this.setState({destination_code: ''});
    this.setState({planename: ''});
    this.setState({seats: ''});
  }

  _handleChangeflightnumber(e) {
    this.setState({ flightnumber: e.target.value
    });
  }

  _handleChangeflightdate(e) {
    this.setState({ flightdate: e.target.value,
      });
  }

  _handleChangeorigin_code(e) {
    this.setState({ origin_code: e.target.value,
      });
  }

  _handleChangedestination_code(e) {
    this.setState({ destination_code: e.target.value,
      });
  }

  _handleChangeplanename(e) {
    this.setState({ planename: e.target.value,
      });
  }

  _handleChangeseats(e) {
    this.setState({ seats: e.target.value,
      });
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
            name="flightnumber"
            type="text"
            onChange={this._handleChangeflightnumber}
            value={ this.state.flightnumber } />
        </label>
        <label>
          Date:
          <input
            name="flightdate"
            type="text"
            value={this.state.flightdate}
            onChange={this._handleChangeflightdate} />
        </label>
        <label>
          From:
          <input
            name="origin_code"
            type="text"
            value={this.state.origin_code}
            onChange={this._handleChangeorigin_code} />
        </label>
        <label>
          To:
          <input
            name="destination_code"
            type="text"
            value={this.state.destination_code}
            onChange={this._handleChangedestination_code} />
        </label>
        <label>
          Plane:
          <input
            name="planename"
            type="text"
            value={this.state.planename}
            onChange={this._handleChangeplanename} />
        </label>
        <label>
          Seats:
          <input
            name="seats"
            type="number"
            value={this.state.seats}
            onChange={this._handleChangeseats} />
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
  <tbody key={f.id}>
  <tr key={f.id}>
    <td key={f.id}>{f.flightnumber}</td>
    <td key={f.id}>{f.origin_code}</td>
    <td key={f.id}>{f.destination_code}</td>
    <td key={f.id}>{f.flightdate}</td>
    <td key={f.id}>{f.planename}</td>
    <td key={f.id}>{f.seats}</td>
  </tr>
  </tbody>)}
</table>
      </div>

    );
  }
}

export default Flights;
