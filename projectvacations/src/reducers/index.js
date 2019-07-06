import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';

//import getvacations from './getvacations';
import addvacation from './addvacation'
import filtervacations from './filtervacations'

export default combineReducers ({
    routing: routeReducer,
   // getvacations,
    //addvacation,
    //filtervacations
});