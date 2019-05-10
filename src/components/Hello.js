import React, {Component} from 'react';
import './../App.css';
import './../index.css';
import UserProfile from './UserProfile';

class Hello extends Component {
    
    render() {
        const name = UserProfile.getName();
        if (name==="") {
            name = UserProfile.getEmail();
        }
        return (
          <h2>
            Hello, {name}
          </h2>
        );
      }
};

export default Hello;