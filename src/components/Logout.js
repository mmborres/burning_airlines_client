import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

class Logout extends Component {
constructor() {
  super()
  UserProfile.setName('');
  UserProfile.setUserId('');
  UserProfile.setAdmin('')
  window.location.href = "/";
}

  render() {

      return {
      }
    }
  }

  export default Logout;
