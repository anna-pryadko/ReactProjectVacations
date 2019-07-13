import React, { Component } from 'react';
import axios from "axios";
//import Registration from './MyReg';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody,MDBModalFooter } from 'mdbreact';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link, Switch, Redirect} from 'react-router-dom';

import Registration from '../Registration/Registration';
import HomeUser from '../Home/HomeUser';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';

class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }


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

    //  componentDidMount=()=>{
    //   {   
    //     var self=this;
    //     axios.get(`http://localhost:4000/checkLogin?name=${name}&password=${password}`,{withCredentials:true})
    //     .then(function(response){
          
    //       console.log('isLoggedIn',response.data);
          
    //      self.setState({ isLoggedIn: response.data });
    //     })
    //     .catch(function(error){
    //        console.log(error);
    //     });
    
    //     }
    //    }

//Validation userName and password

_isFormValid() {
  return this._isNameValid(this.state.username) && this._isPassValid(this.state.password)
}

_isNameValid(username) {
  let isValid=true;
  let errorName='';

  if (username==='') {
    errorName='Name is empty!';
    isValid=false;
    this.setState({errorName:errorName});
    return isValid;
  } 

  if (username.length < 3) {
    errorName='Name must have 3 symbols minimum!';
    isValid=false;
    this.setState({errorName:errorName});
    return isValid;
  } 
}

_isPassValid(password) {
  let isValid=true;
  let errorPassword='';

  if (password==='') {
    errorPassword='Password is empty!';
    isValid=false;
    this.setState({errorName:errorPassword});
    return isValid;
  } 
}
      
// Check Login  

handleClick=()=>{ 
    console.log('checkLogin')
    let isValud=this._isFormValid();
        if (isValud==true) {
          console.log('Valid')
          let password=this.state.password;
          let userName=this.state.userName; 
          var self=this;
          axios.get(`http://localhost:5000/checkLogin?name=${userName}&password=${password}`,{withCredentials:true})
          .then(function(response){
            
          console.log('currentUser',response.data);
            
          self.setState({ currentUser: response.data });

          this.setLogin();  
          })
          .catch(function(error){
            console.log(error);
          });
        } 
        else {
          if (this.state.errorName) {alert(this.state.errorName);}
          if (this.state.errorPassword) {alert(this.state.errorPassword);}
         }

      } 

    setLogin=()=>{       
        let localUser = this.state.currentUser;

          if(localUser!=={}){  
            localStorage.currentUser=JSON.stringify(localUser); //save user to localstorage 
            this.setState({isLoggedIn:true})    
            
            if (localUser.role=="1")
                 {
                  this.setState({isAdmin: true});
                  console.log("isAdmin",this.state.isAdmin)    
                 } 
                 else 
                   {
                     this.setState({isAdmin: false});
                     console.log("isAdmin",this.state.isAdmin)
                   }          
                  }  
                  else {
                    alert('Name or password incorrect!')
                  } 
                 }
                 
    render() {

      if (this.state.isLoggedIn == true && this.state.isAdmin ==true){ 
        return  <Redirect to="/HomeUser"/>
       }
      //  if (this.state.isLoggedIn == true && this.state.isAdmin ==false){   // redirect to Admin/User
      //   return  <Redirect to="/Home"/>
      //  }

        return (
          <BrowserRouter>
          
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard>
                    <MDBCardBody>
                      <form>
                        <p className="h4 text-center py-4">Login</p>
                        <div className="grey-text">
                          <MDBInput
                            label="Your name"
                            icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange = {(event,target) => this.setState({username:event.target.value})}
                            // onChange={this.changeName}
                            value={this.state.username}
                          />
                          <MDBInput
                            label="Your password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            onChange = {(event,target) => this.setState({password:event.target.value})}
                            // onChange={this.changePassword}
                            value={this.state.password}
                          />
                        </div>
                        <div className="text-center py-4 mt-3">
                          <MDBBtn color="cyan" type="submit" onClick={() =>this.handleClick()}>
                            LOGIN
                          </MDBBtn>
                        </div>
                      </form>
                      <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a member? <Link to="/Registration">Sign Up</Link></p>
                  
                  {/* <p>Forgot Password?</p> */}
                </div>
               
              </MDBModalFooter>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            
            </MDBContainer>
            
          
            <Route path="/Registration" exact component={Registration} />
            <Route path="/HomeUser" exact component={HomeUser} />
            </BrowserRouter>
          );
        };
      }   
  export default Login;
  