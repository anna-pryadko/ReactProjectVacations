import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'

import getvacations from './actions/getvacations';

import Home from './Components/Home/Home.js';
import Main from './Components/Main/Main.js';
//import Login from './Components/Login/MyLogin.js';

class App  extends Component {
  render() {
    console.log('this.props.testStore',this.props.testStore)
    return (
      <Home></Home>
    )
  }
}

// ({onGetVacations})=> {

//   const getvacations=()=>{
//     onGetVacations();
//   }


 export default App;
