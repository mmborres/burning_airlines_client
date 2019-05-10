import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';
//import Login from './Login';

class Logout extends Component {
  constructor() {
    super();

//const Logout = ( function() {
  UserProfile.setName('');
    UserProfile.setEmail('');
    UserProfile.setUserId(-1);
    UserProfile.setAdmin(false);

    let urlstr = window.location.href;
    if (urlstr.includes("#")) {
      urlstr = urlstr.split("#")[0] + "#/"
    }
    console.log(urlstr);
    window.location.replace(urlstr);
    //window.location.replace(urlstr);
    //window.location.reload();

//    return
//  } )();

  }

  render() {
    
    return "/"
    }
  }


export default Logout;
