import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Router as ReachRouter, navigate } from '@reach/router'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Feed from './components/Feed';
import Feed2 from './components/Feed2';
import ProfileOfArtist from './components/ProfileOfArtist';
import Upload from './components/Upload';
import SinglePost from './components/SinglePost';
import Followers from './components/Followers';
import { UserProvider } from './Context/UserContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';




const App = () => {

    return (
        <UserProvider>
            
            <Router>
                {/* <Nav />    */}
                    <Switch>

                        <PublicRoute component={Landing} path="/home" restricted={true} exact/>

                        <PublicRoute component={Signup} path="/signup" restricted={true} exact/>

                        <PublicRoute component={Login} path="/login" restricted={true} exact/>

                        <PrivateRoute component={Feed} path="/feed" exact />

                        <PrivateRoute component={Feed2} path="/" exact />

                        <PrivateRoute component={ProfileOfArtist} path='/profileOfArtist/:id' exact />
                        
                        <PrivateRoute component={SinglePost} path='/singlePost/:id' exact />

                        <PrivateRoute component={Upload} path='/upload' exact />

                        <PrivateRoute component={Followers} path='/followers/:id/:followedBy' exact />
                        
                    </Switch>

            </Router>

        </UserProvider>
    )
}

export default App