import React, { Component } from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import axios from "axios";
import { MDBFormInline, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

// import './Home.css';

import Login from '../Login/Login.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Card from '../Card/Card';

class HomeUser extends Component {

    state = {

	  currentUsName:"",
	  userId:"",  

      currentUserVacations: [],
	};
	
	
//Get all vacations

    componentDidMount=()=>{
		let currentUserId = JSON.parse(localStorage.currentUserId);
		let currentUsName = JSON.parse(localStorage.currentUserName);

		
        this.setState({ currentUsName: currentUsName });
        this.setState({ userId: currentUserId });

		//console.log('currentUser: ',currUser);
		
		console.log('currentUserId: ',currentUserId);
		
        var self=this;
        axios.get(`http://localhost:5000/getAllVacation?currentUserId=${currentUserId}`)
        .then(function(response){
		 
		// console.log(this.state.allVacations);
	
         console.log(response.data);
         
		 self.setState({ currentUserVacations: response.data });
		// console.log(this.state.allVacations);

        })
        .catch(function(error){
           console.log(error);
        });
      } 
      
      printCardsfavourite=()=>{
        let printArrayfavourite  = [];
		console.log(this.state.currentUserVacations);
        for(let item of this.state.currentUserVacations)
        {
			item.start_date=item.start_date.substring(0,10) //this function cut the date to normal without zone time
            item.end_date=item.end_date.substring(0,10)
            if (item.status!==null) {
            printArrayfavourite.push(<Card key={item.id} data={item}/>)
            
            }
		}
        console.log('printArrayfavourite: ',printArrayfavourite);
        return printArrayfavourite;
      }

      printCards=()=>{
        let printArray  = [];
		console.log(this.state.currentUserVacations);
        for(let item of this.state.currentUserVacations)
        {
            if (item.status==null) {
            printArray.push(<Card key={item.id} data={item}/>)
            
            }
		}
        console.log('printArray: ',printArray);
        return printArray;
      }
   
      LinkLogOut= () => {
        localStorage.removeItem('currentUser');
        var self=this;
        axios.get(`http://localhost:5000/Logout`,{withCredentials:true})
        .then(function(response){
          
          console.log(response.data);
           
        // self.setState({ isLogin: response.data });
        })
        .catch(function(error){
           console.log(error);
        });
        }

      

  render() {
    return (
	
		<div>
		 
				<h2>OUR VACATIONS</h2>

                <h3>Yours favourite vacations:</h3>
				
					<div className="row">
						{this.printCardsfavourite()}
					</div>

                <h3>Others vacations:</h3>
				
                    <div className="row">
                        {this.printCards()}
                    </div>    
		       

		  <div className="row">
           <a type="button" onClick={() =>this.LinkLogOut()}><Link to="/Logout">LogOut</Link></a>
           <Route path="/Login" exact component={Login} />
           </div>
   
		</div>
  
    );
  }
}
    
export default HomeUser;
