import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'



const PublicRoute = ({component: Component, restricted, ...rest}) => {
    

    const {loggedInUser} = useContext(UserContext)

    return (
        <Route {...rest} render={props => (
            loggedInUser.refreshtoken && restricted ?
            <Redirect to="/" />
            : 
            <Component {...props} />
        )} />
    );
};

export default PublicRoute;