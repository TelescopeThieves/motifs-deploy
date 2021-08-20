import React, {useState, useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../Context/UserContext'



const PrivateRoute = ({component: Component, ...rest}) => {

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    const userCheck = Object.keys(loggedInUserContext).length ? true : false


    return (
            // {/* // Show the component only when the user is logged in */}
            // {/* // Otherwise, redirect the user to /signin page */}
            <Route {...rest} render={props => (
                userCheck ?
                <Component {...props} />
                : 
                <Redirect to="/" />
            )} />   
    );
};

export default PrivateRoute;