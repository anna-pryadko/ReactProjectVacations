import React, { Component }  from 'react';
import { Route, Link, Switch,Redirect} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import axios from "axios";

import Home from '../Home/Home';

//import './Card.css';
// import ToggleButton from 'react-bootstrap/ToggleButton'
// import {Card,Button} from 'react-bootstrap';
//import axios from "axios";

class ModalLogin extends Component {
    
    state={
        userName:"",
        password:"",
    
        errorName:"",
        errorPassword:"",
    
        currentUser:{},
        isLoginSuccess:"",
    
        foundUsers:[],
        isLoggedIn: false,
        isAdmin:false,
    
        checkCookie:"",
        cookieArr:[],
       }
      

handleClick=()=>{ 
    
          
          let password=this.state.password;
          let userName=this.state.userName; 
          console.log(password,userName);
          var self=this;
          axios.get(`http://localhost:5000/checkLogin?name=${userName}&password=${password}`,{withCredentials:true})
          .then(function(response){
            
          console.log('currentUser',response.data);
            
          self.setState({ currentUser: response.data});
          let curUs=response.data;
          self.setState({ isLoggedIn: true });  
          localStorage.currentUser=JSON.stringify(curUs);
        //   this.setLogin();  
          })
          .catch(function(error){
            console.log(error);
          });
         
        

      } 

render() {
    
    console.log("props : " , this.props)
    
    return (
     
<MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Subscribe</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Your name (email)
                </label>
                <input
                  type="email"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  onChange = {(event,target) => this.setState({userName:event.target.value})}
                  value={this.state.userName}
                />
                <br />
                <label
                  htmlFor="defaultFormCardEmailEx"
                  className="grey-text font-weight-light"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="defaultFormCardEmailEx"
                  className="form-control"
                  onChange = {(event,target) => this.setState({password:event.target.value})}
                  value={this.state.password}
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn btn-outline-purple" type="submit" onClick={() =>this.handleClick()}>
                    Login
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
     
    </MDBContainer>
  
 
       
    );
}
}

export default ModalLogin