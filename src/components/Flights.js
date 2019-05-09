import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../App.css';
import './../index.css';
import UserProfile from './UserProfile';

const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/flights.json';
const PLANE_URL = 'https://powerpuffairlines.herokuapp.com/planes.json';

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


  saveFlight(flightnumber, flightdate, origin_code, destination_code, planename, seats, plane_id) {
    //console.log(flightnumber, flightdate, origin_code, destination_code, planename, seats);
    axios.post(SERVER_URL, {flightnumber: flightnumber, flightdate: flightdate, origin_code: origin_code, destination_code: destination_code, planename: planename, seats: seats, plane_id: plane_id}).then((result) =>{
      this.setState({flights: [...this.state.flights, result.data]});
    });
  }


  render () {
    const admin = UserProfile.isAdmin() === true;
    if (admin) {
      return (
        <div className="flights">
          <h1>All Flights</h1>

          <FlightForm onSubmit={ this.saveFlight}/>
          <Gallery flights={ this.state.flights}/>
          <p>
          <Link to="/home">Back to Home</Link>
          </p>
        </div>
      );
    }
      else {
        return (
          <div className="flights">
            <h1>All Flights</h1>

            <Gallery flights={ this.state.flights}/>
            <p>
            <Link to="/home">Back to Home</Link>
            </p>
          </div>
        );
      }

  }
};


class FlightForm extends Component {
  constructor() {
    super();
    this.state = { flightnumber: '', flightdate: '' , origin_code: '', destination_code: '', planename: '', seats: 0, plane_id: 0, planes: []};
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChangeflightnumber = this._handleChangeflightnumber.bind(this);
    this._handleChangeflightdate = this._handleChangeflightdate.bind(this);
    this._handleChangeorigin_code = this._handleChangeorigin_code.bind(this);
    this._handleChangedestination_code = this._handleChangedestination_code.bind(this);
    this._handleChangeplanename = this._handleChangeplanename.bind(this);
    this._handleChangeseats = this._handleChangeseats.bind(this);

    const fetchplanes = () => {
      axios.get(PLANE_URL).then((results) => {
        this.setState({planes: results.data});
        setTimeout(fetchplanes, 10000);
      });
    };
    fetchplanes();
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.flightnumber, this.state.flightdate, this.state.origin_code,
      this.state.destination_code, this.state.planename, this.state.seats, this.state.plane_id);

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
    //name:747:cols:6:rows:50:id:1
    //parse values first
    const parseme = e.target.value;
    const p = parseme.split(':');
    //"name", "747", "cols", "6", "rows", "50", "id", "1"
    //console.log(p);

    this.setState({
      planename: p[1],
      seats: ( Number(p[3])*Number(p[5]) ),
      plane_id: Number(p[7])
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
            type="date"
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
          <select name="planename" onChange={this._handleChangeplanename}>
          <option id="0" name="" value=""></option>
          { this.state.planes.map( (ap) => <option id={ap.id} key={ap.seats} name={ap.name} value={ "name:" + ap.name + ":cols:" + ap.cols + ":rows:" + ap.rows + ":id:" + ap.id }>{ap.name}</option>) }
          </select>
        </label>
        <input type="submit" value="Save Flight" />
      </form>
    );
  }
}

class Gallery extends Component {
  render() {
    return (
      <div className="flights">
      <h2>Flights</h2>
        <table>
          <th>Flight</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th>
          <th>Plane</th>
          <th>Seats</th>
{this.props.flights.map((f) =>
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
  }
}

export default Flights;
