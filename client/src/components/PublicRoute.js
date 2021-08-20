import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'



const PublicRoute = ({component: Component, restricted, ...rest}) => {
    

    const {loggedInUserContext} = useContext(UserContext)

    const userCheck = Object.keys(loggedInUserContext).length ? true : false

    return (
        <Route {...rest} render={props => (
            userCheck && restricted ?
            <Redirect to="/feed" />
            : 
            <Component {...props} />
        )} />
    );
};

export default PublicRoute;