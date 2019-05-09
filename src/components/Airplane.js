import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import './../App.css';

  const SERVER_URL = 'https://powerpuffairlines.herokuapp.com/planes.json';

  class Airplane extends Component {
    constructor() {
      super();
      this.state = {
        planes: []
      }
      this.savePlane = this.savePlane.bind(this);

      const fetchPlanes = () => {
        axios.get(SERVER_URL).then((results) => {
          console.table(results.data);
          this.setState({planes: results.data});
          //setTimeout(fetchPlanes, 4000);
        })
      };
      fetchPlanes();
    }

    savePlane(name, rows, columns) {
      axios.post(SERVER_URL, {name: name, rows:rows, cols:columns}).then((result) => {
        this.setState({planes: [...this.state.planes, result.data]})
      });
    }
    render() {
      return (
        <div className="airplane">
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
        <form onSubmit={this._handleSubmit} className="airplaneform">
          <label>Name</label>
          <input type="text" onInput={this._handleInputName}/>
          <br />
          <label>Rows</label>
          <input type="number" onInput={this._handleInputRows} />
          <br />
          <label>Columns</label>
          <input type="number" onInput={this._handleInputColumns} />
          <br />
          <input type ="submit" />
          <br />
        </form>
      );
    }
  };

  class DisplayGrid extends Component {

    displayPlane = (rows, cols) => {

      let table = [];
      for (let i=0; i<rows; i++) {
        let eachRow = [];
        for (let j=0; j<cols; j++) {
          eachRow.push(<td className="plane"></td>)
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
        <div className="displayplane">
        <table className="planetable"><tr key="123"><th>Plane Name</th><th>Rows</th><th>Columns</th></tr>
          {this.props.planes.map( (ap) => <tr key={ap.id}><td>{ap.name}</td><td>{ap.rows}</td><td>{ap.cols}</td></tr>)}
        </table>
          {this.displayPlane(10, 5)}
        </div>
      );
    }
  };
export default Airplane;
