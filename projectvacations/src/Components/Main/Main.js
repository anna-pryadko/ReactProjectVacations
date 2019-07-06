//import { BrowserRouter } from 'react-router-dom';
//import { Route, Link, Switch,} from 'react-router-dom';
import React, { Component } from 'react';
import {Provaider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extention';
import thunk from 'redux-thunk';
import {Router, Route, hashHistory} from 'react-router';
import syncHistoryWithStore from 'react-router-redux';

//import Home from '../Home/Home.js';
//import Menu from '../Menu/Menu.js';
import Jumbotron from '../Jumbotron/Jumbotron';

//import reducer from '../../reducers';

class Main extends Component {
    state = {
      
      allVacation:[]
    
    };
  
  render() {
  
    const loggedIn = this.state.checkCookie === '1';
    console.log("LOGGWD", loggedIn)
  
    return (
     <Jumbotron></Jumbotron>
    );
  }
  }
  export default Main;
  