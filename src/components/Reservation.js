import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';

  const SERVER_URL = 'http://localhost:3000/airplanes.json';

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
        this.setState({planeRows: results.data[0].rows, planeCols: results.data[0].column });
        //setTimeout(fetchPlanes, 4000);
      })
    }

    render() {
      return (
        <div>
          <h1>Reservation coming soon</h1>
          <button>Select</button>
          <DisplaySeats planeRows={this.state.planeRows} planeCols={this.state.planeCols}/>
        </div>
      )
    }
  };

  class DisplaySeats extends Component {

    displayRow = (rows, cols) =>{
      let row = React.createElement('div', {className: "rowclass"});
      for (let i=1; i<=rows; i++) {
        //row+=row;
        for (let j=1; j<=cols; j++) {
          row+="<span>X</span>";
        }
        //row+="</div>";
      }

      return (
        row
      );
    }

    render() {
      return (
        <div>
          {/*this.props.planeRows*/}
          {this.displayRow(this.props.planeRows, this.props.planeCols)}
        </div>
      );
    }
  };

export default Reservation;
