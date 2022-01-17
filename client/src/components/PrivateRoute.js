import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'



const PrivateRoute = ({component: Component, ...rest}) => {

    const { loggedInUser } = useContext(UserContext)

    return (
            // {/* // Show the component only when the user is logged in */}
            // {/* // Otherwise, redirect the user to /signin page */}
            <Route {...rest} render={props => (
                loggedInUser.refreshtoken ?
                <Component {...props} />
                : 
                <Redirect to="/home" />
            )} />   
    );
};

export default PrivateRoute;