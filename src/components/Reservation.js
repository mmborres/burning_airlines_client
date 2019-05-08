import React, {Component} from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planeRows: 0,
      planeCols: 0,
      takenseats: [],
      seats: 0,
      flight_URL: ''
    }
    this.getFlight = this.getFlight.bind(this);
    this.getFlightURL = this.getFlightURL.bind(this);
    //UserProfile.setName("testuser");
    //UserProfile.setUserId(1);

  };

  getFlightURL() {
    const flight_id = this.props.match.params.flightid;
    const flight_URL = "https://powerpuffairlines.herokuapp.com/flights/" + flight_id + ".json"; //make dynamic
    this.setState({ flight_URL: flight_URL });

  }

  
  getFlight () {
    if (this.state.flight_URL===null) {
      this.getFlightURL();
    }
    axios.get(this.state.flight_URL).then((results) => {
      if (results!==null && results.data!==null && results.data.takenseats!==undefined) {
        this.setState({ takenseats: results.data.takenseats, seats: results.data.seats });
      }
    });
  }

  componentDidMount () { 
    this.getFlightURL();
    this.getFlight();

    const plane_id = this.props.match.params.planeid;
    const plane_URL = "https://powerpuffairlines.herokuapp.com/planes/" + plane_id + ".json";

    axios.get(plane_URL).then((results) => {
      this.setState({planeRows: results.data.rows, planeCols: results.data.cols });
      setInterval(this.getFlight, 3000);
    })
  }

  render() {
    //console.log(this.state.flight_URL);
    //this.getFlightURL();
    //this.getFlight();

    return (
      <div>
      <h1>Flight Reservation</h1>
      <DisplaySeats planeRows={this.state.planeRows} planeCols={this.state.planeCols} flightid={this.props.match.params.flightid} takenseats={this.state.takenseats} seats={this.state.seats} />

      <Link to={ "/flights/" }><button>Payment Done</button></Link>
      </div>
    )
  }
};

class DisplaySeats extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSeat: '',
      username: UserProfile.getName(),
      user_id: UserProfile.getUserId()
    }

  }

  /* creating a table of seats */
  displayRow = (rows, cols) => {

    let table = [];
    for (let i=0; i<rows; i++) {
      let eachRow = [];
      for (let j=0; j<cols; j++) {
        eachRow.push(<Seat onSelectSeat={this.handleSeatSelection} datacol={j} datarow={i} selectedSeat= {this.state.selectedSeat} takenseats={this.props.takenseats} seats={this.props.seats} />)
        // onClick={this._onClick} >{`C: ${j} R: ${i}`}
      }
      table.push(<tr data-row={i}>{eachRow}</tr>)
    }
    return (
      table
    );
  }
  /* latest seat selected by user is passed into this*/
  handleSeatSelection = (seat) => {
    this.setState({selectedSeat: seat});
  }

  /*This is the button event handler, the seat number which is selected is being passed into it which has to be used in post request further*/

  /* button is enabled only after a selection */

  handleSubmit = () => {
    //username: UserProfile.getName(),
    const user_id = UserProfile.getUserId();
    console.log(user_id);
    //console.log(this.state.username);
    //console.log(this.state.user_id);
    console.log(this.props.flightid);
    console.log(this.state.selectedSeat);

    const rs_url = "https://powerpuffairlines.herokuapp.com/reservations.json";
    axios.post(rs_url, { user_id: this.state.user_id, flight_id: this.props.flightid, seatnumber: this.state.selectedSeat }).then((result) =>{
      //this.setState({flights: [...this.state.flights, result.data]});
    });

    const flight_URL = "https://powerpuffairlines.herokuapp.com/flights/" + this.props.flightid + ".json"; //make dynamic
    const takenseats = this.props.takenseats + "," + this.state.selectedSeat + ",";

    axios.put(flight_URL, { takenseats: takenseats, seats: (this.props.seats - 1) }).then((result) =>{
      //this.setState({flights: [...this.state.flights, result.data]});
    });
  }

  render() {
    return (
      <div>
      <div>
      {this.displayRow(this.props.planeRows, this.props.planeCols)}
      </div>
      <p></p>
      <button disabled={!this.state.selectedSeat} onClick={this.handleSubmit}>Select</button>
      </div>
    );
  }
};

class Seat extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this)
  }

  /* selectedSeat state is initially blank in the parent class DisplaySeats and it is being passed to this child class Seat as props so that the click <td> innertext(seatNumber) can be stored inside selectedSeat and the seatNumber can be passed into the onSelectSeat function as an argument */
  _onClick(e) {
      const seat = e.currentTarget.innerText;
      this.setState({selectedSeat: seat})
      this.props.onSelectSeat(seat);
  }

  render() {
    //console.log(this.props.takenseats);
    const takenseats = this.props.takenseats;

    const seatNumber = "" + ( (this.props.datacol + 1) + 9).toString(36).toUpperCase() + (this.props.datarow + 1);
    //console.log(seatNumber);

    let className = this.props.selectedSeat === seatNumber ? 'clicked' : '';
    if (takenseats!==null && takenseats!=="") {
      className = takenseats.includes(seatNumber + ",") ? 'taken' : className;
    }

    return (
      <td onClick={this._onClick} className={className}>
      {seatNumber}
      </td>
    );
  }
}

export default Reservation;