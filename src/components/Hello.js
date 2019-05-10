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
          <div>
            Hello, {name}
          </div>
        );
      }
};

export default Hello;