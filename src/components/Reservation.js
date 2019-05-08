import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';

  const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/planes.json';

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
        this.setState({planeRows: results.data[0].rows, planeCols: results.data[0].cols });
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

  class Seat extends React.Component {
    constructor() {
      super();
      this.state = {click: false}
      this._onClick = this._onClick.bind(this)
    }

    _onClick(e) {
      if (!this.state.click) {
        this.setState({click: true})
      } else {
        this.setState({click: false})
      }
    }
  render() {
    return (
      <td onClick={this._onClick} className={this.state.click ? 'clicked' : null}>
        <p>r: {this.props.datarow}</p>
        <p>c: {this.props.datacol}</p>
      </td>
    );
  }
}

  class DisplaySeats extends Component {

    displayRow = (rows, cols) => {
      let table = [];
      for (let i=1; i<=rows; i++) {
        let eachRow = [];
        for (let j=1; j<=cols; j++) {
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
