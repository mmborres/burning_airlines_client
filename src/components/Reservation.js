import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';

  const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/planes/1.json';

  class Reservation extends Component {
    constructor() {
      super();
      this.state = {
        planeRows: 0,
        planeCols: 0,
      }
    };

    componentDidMount () {
      axios.get(SERVER_URL).then((results) => {
        console.log(results.data);
        this.setState({planeRows: results.data.rows, planeCols: results.data.cols });
        console.log(this.state.planeRows)
        //setTimeout(fetchPlanes, 4000);
      })
    }

    render() {
      return (
        <div>
          <h1>Reservation coming soon</h1>
          <DisplaySeats planeRows={this.state.planeRows} planeCols={this.state.planeCols}/>
        </div>
      )
    }
  };

  class DisplaySeats extends Component {

    displayRow = (rows, cols) => {
      let table = [];
      for (let i=0; i<rows; i++) {
        let eachRow = [];
        for (let j=0; j<cols; j++) {
          //row+="<span>X</span>";
          eachRow.push(<Seat datacol={j} datarow={i} />)
          // onClick={this._onClick} >{`C: ${j} R: ${i}`}
        }
        table.push(<tr data-row={i}>{eachRow}</tr>)
      }
      return (
        table
      );
    }

    render() {
      return (
        <div>
        <div>
          {/*this.props.planeRows*/}
          {this.displayRow(this.props.planeRows, this.props.planeCols)}
        </div>
        <button>Select</button>
        </div>
      );
    }
  };

export default Reservation;

class Seat extends React.Component {
  constructor() {
    super();
    this.state = {click: false}
    this._onClick = this._onClick.bind(this)
  }

  _onClick(e) {
    if (!this.state.click) {
      //this.state.tdelelement.
      this.setState({click: true, tdelelement: this})
    } else {
      this.setState({click: false})
    }
  }
render() {
  const seatNumber = "" + ( (this.props.datacol + 1) + 9).toString(36).toUpperCase() + (this.props.datarow + 1);
  return (
    <td onClick={this._onClick} className={this.state.click ? 'clicked' : null}>
      <p>{seatNumber}</p>
    </td>
  );
}
}
