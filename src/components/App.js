import React from 'react';
import Home from './Home';
import './../App.css';


function App() {
  return (
    <div className="App">
      < Home />
    </div>
  );
}

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    isAuthenticated: false
  };
}

userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
  }
}


export default App;
