import React, { Component } from 'react';
import { Route, Link, Switch,Redirect} from 'react-router-dom';
import { MDBFormInline, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

import Jumbotron from '../Jumbotron/Jumbotron';
//import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import HomeUser from '../Home/HomeUser';
import HomeAdmin from '../Home/HomeAdmin';
import ModalLogin from '../ModalLogin/ModalLogin';


//import reducer from '../../reducers';

class Main extends Component {
    state = {

      checkCookie:"",
      userRole:"",
      
      currentUser:{},

    };

      componentDidMount=()=>{
        
        if (localStorage.currentUser) {
          let currUser = JSON.parse(localStorage.currentUser) 

          this.setState({ currentUser: currUser });
          this.setState({ userRole: currUser.role });
          
     }

        var self=this;
        axios.get(`http://localhost:5000/checkCookie`,{withCredentials:true})
        .then(function(response){
          
         console.log('checkCookie',response.data); // 1 or 0
        
         self.setState({ checkCookie: response.data });

        })
        .catch(function(error){
           console.log("Error",error);
        });
        console.log(this.state.checkCookie);
    
      }
      
  render() {

  console.log("checkCookie", this.state.checkCookie)

   let loggedIn = this.state.checkCookie === '1'

   console.log("LOGGWD", loggedIn)
   console.log("userRole", this.state.userRole)

    if (loggedIn == true && this.state.userRole =='0'){ 
      return  <Redirect to="/HomeAdmin"/>
     }
     
     if (loggedIn == true && this.state.userRole =='1'){   // redirect to Admin/User
      return  <Redirect to="/HomeUser"/>
     }
    
     if (loggedIn == false){   // redirect to Login/Registration
      return  <Redirect to="/Login"/>
     }
    
    return (
      <div>

     </div>
    
    );
  }
  }
  export default Main;
  