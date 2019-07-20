import React, { Component }  from 'react';
import { Route, Link, Switch,Redirect} from 'react-router-dom';
import {Container, Col, Form,FormGroup, Label, Input,Button,} from 'reactstrap';
import {MDBMask, MDBView } from 'mdbreact';
import { AvField } from 'availity-reactstrap-validation';
import axios from "axios";

import './Login.css';

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
        //   this.setUserP();  
          })
          .catch(function(error){
            console.log(error);
          });
         
      } 

render() {
    
    console.log("props : " , this.props)
    
    return (

   
      <div className="Main">                  
              <Container className="App">
                 <div className="row">
                 <div className="loginBox col-md-4">
                   <h2 className="mb-2">LOGIN</h2>
                   <Form className="form">
                     <Col>
                       <FormGroup>
                       <Label className="lableBox" for="userName">Enter user name (email)</Label>
                         <input
                           type="text"
                           name="userName"
                           id="userName"
                           placeholder="Enter user name (mail)"
                           onChange = {(event,target) => this.setState({userName:event.target.value})}
                           value={this.state.userName}
                         />
                       </FormGroup>
                     </Col>
                     <Col>
                       <FormGroup>
                         <Label for="Password">Password</Label>
                         <input
                           type="password"
                           name="password"
                           id="examplePassword"
                           placeholder="****"
                           onChange = {(event,target) => this.setState({password:event.target.value})}
                           value={this.state.password}
                         />
                       </FormGroup>
                     </Col>
              <button type="submit" className="offset-5" onClick={() =>this.handleClick()}>login</button>
              <button type="button" className="btn btn-primary offset-1 " ><Link to="/Regester">Regester Now</Link></button> 
                   </Form>
                   </div>
                   </div>
                 </Container>
                 {/* <Route path="/Regester" exact component={Regester} />
                 <Route path="/HomeUser" exact component={HomeUser} />
                 <Route path="/HomeAdmin" exact component={HomeAdmin} /> */}
                 {/* <Route path="/" exact component={Login_Project} /> */}
                 </div>  
                

    );
}
}

export default ModalLogin