import React, { Component }  from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter,  MDBTooltip } from "mdbreact";


import './Card.css';
// import ToggleButton from 'react-bootstrap/ToggleButton'
// import {Card,Button} from 'react-bootstrap';
import axios from "axios";

class CardAdmin extends Component {
    
state={

    //checkOn:"" , 
    idVacAdm:"",
   // user_id:""
}    



componentDidMount(){
    // let currUserCard = JSON.parse(localStorage.currentUser);
    // let currentUserIdCard=currUserCard.data[0].id;
    // this.setState({ user_id : currentUserIdCard })

    //this.setState({ checkOn : this.props.user_id }) //user_id or null
    this.setState({ idVacAdm : this.props.id })
    
}

render() {
    
    console.log("props : " , this.props)
    
    return (
        
        <MDBCard wide ecommerce>
            <MDBCardImage
              cascade
              src={this.props.data.image}
              top
              alt="sample photo"
            />
            <MDBCardBody cascade className="text-center">
              {/* <a href="#!" className="text-muted"> */}
                 <strong>
                 <h3>{this.props.data.title}</h3>
                </strong>
              {/* </a> */}
              <MDBCardTitle>
                    Place, Town

                {/* <strong>
                  <a href="#!">GoPro</a>
                </strong> */}
              </MDBCardTitle>
              <MDBCardText>
                My Description Bly-bly-bly
              </MDBCardText>
              <MDBCardText>
                Dates
              </MDBCardText>
              <MDBCardFooter className="px-1">
                <span className="float-left font-weight-bold">
                  <strong>{this.props.data.price}+'$'</strong>
                </span>
                <span className="float-right">
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-eye grey-text ml-3"
                    tooltipContent="Quick look"
                  />
                  {/* {this.checkFavourite} */}
                  {/* <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-heart grey-text ml-3"
                    tooltipContent="Add to watchlist"
                  /> */}
                </span>
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        
        // <div className='card' style={{width:18+'rem'}}>
        // <img className='card-img-top' src={this.props.data.image} alt='Card image cap'></img>
        // <div className='card-body'>
        // <h5 className='card-title'>{this.props.data.title}</h5>
        // <p className='card-text'>{this.props.data.price}</p>
        // {/* <label htmlFor={this.props.id} className='switch'>
        // {this.checkToggle()}
        // <span className='slider round'></span>
        // </label> */}
        // </div>
        // </div> 
    ); 
}
}

export default CardAdmin