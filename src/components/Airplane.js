import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import './../App.css';

  const SERVER_URL = 'http://localhost:3000/airplanes.json';

  class Airplane extends Component {
    constructor() {
      super();
      this.state = {
        planes: []
      }
      this.savePlane = this.savePlane.bind(this);

      const fetchPlanes = () => {
        axios.get(SERVER_URL).then((results) => {
          console.log(results.data);
          this.setState({planes: results.data});
          //setTimeout(fetchPlanes, 4000);
        })
      };
      fetchPlanes();
    }

    savePlane(name, rows, columns) {
      axios.post(SERVER_URL, {name: name, rows:rows, columns:columns}).then((result) => {
        this.setState({planes: [...this.state.planes, result.data]})
      });
    }
    render() {
      return (
        <div>
          <h1>Create Airplane</h1>
          <CreateForm onSubmit={this.savePlane}/>
          <DisplayGrid planes={this.state.planes}/>
        </div>
      );
    }
  };

  class CreateForm extends Component {
    constructor() {
      super();
      this.state = {
        name: '',
        rows: 0,
        columns: 0
      };
      this._handleInputName = this._handleInputName.bind(this);
      this._handleInputRows = this._handleInputRows.bind(this);
      this._handleInputColumns = this._handleInputColumns.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
    _handleInputName(e) {
      this.setState({name: e.target.value})
    }
    _handleInputRows(e) {
      this.setState({rows: e.target.value})
    }
    _handleInputColumns(e) {
      this.setState({columns: e.target.value})
    }
    _handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.name, this.state.rows, this.state.columns)
    }
    render() {
      return (
        <form onSubmit={this._handleSubmit}>
          <label>Name</label>
          <input type="text" onInput={this._handleInputName}/>
          <label>Rows</label>
          <input type="number" onInput={this._handleInputRows} />
          <label>Columns</label>
          <input type="number" onInput={this._handleInputColumns} />
          <input type ="submit" />
        </form>
      );
    }
  };

  class DisplayGrid extends Component {

    // constructor() {
    //   super()
    //
    //   this.state = {
    //     planeRows: [],
    //     planeCols: [],
    //   }
    // }
    //
    // renderSeats() {
    //   console.log(this.props.planes);
    //   this.props.planes.forEach((plane) => {
    //     let columns = new Array(plane.column).fill(null)
    //     let rows = new Array(plane.rows).fill(null)
    //     console.log(rows);
    //
    //   })
    //   this.setState({planeRows: [...this.state.planeRows, columns]})
    //   this.setState({planeCols: [...this.state.planeRows, columns]})
    // }

    render() {
      return (

        // {this.renderSeats()}
        <div>
          {this.props.planes.map( (ap) => <div key={ap.id}>{ap.name} <p>{ap.rows} {ap.column}</p></div>)}
        </div>

      );
    }
  };
export default Airplane;
