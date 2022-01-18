import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from './components/Landing'
import Signup from './components/Signup'
import Feed2 from './components/Feed2';
import Upload from './components/Upload';
import Followers from './components/Followers';
import { UserProvider } from './Context/UserContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PlaylistsPage from './components/PlaylistsPage';




const App = () => {

    return (
        <UserProvider>
            
            <Router>
                {/* <Nav />    */}
                    <Switch>

                        <PublicRoute component={Landing} path="/home" restricted={true} exact/>

                        <PublicRoute component={Signup} path="/signup" restricted={true} exact/>

                        <PublicRoute component={Login} path="/login" restricted={true} exact/>

                        <PrivateRoute component={Feed2} path="/" exact />

                        <PrivateRoute component={Upload} path='/upload' exact />

                        <PrivateRoute component={Followers} path='/followers/:id/:followedBy' exact />

                        <PrivateRoute component={PlaylistsPage} path='/playlists' exact />
                        
                    </Switch>

            </Router>

        </UserProvider>
    )
}

export default App