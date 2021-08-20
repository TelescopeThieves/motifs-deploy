import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { Planet } from "phosphor-react";




const Nav = () => {
    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)
    const [loggedOut, setLoggedOut] = useState(false)


    const logout = async () => {

            await fetch('/auth/logoutUser', {
                method: 'POST',
                credentials: 'include', // Needed to include the cookie
              });
              // Clear user from context
              setLoggedInUserContext({});
              setLoggedOut(true)
    }
    if(loggedOut){
        return(
            <Redirect to='/' />
        )
    }
    console.log(loggedInUserContext)
    return(

        <nav className="padding-top padding-bottom padding-left padding-right">
        <section className="navigation">

            <Link to="/">
                <h1>Motifs</h1>
            </Link>
            {loggedInUserContext &&
                <ul>
                    <li className="margin-left2">
                    <Link to='/feed'>
                        Library
                    </Link>
                </li>
                <li className="margin-left2">
                    <Link to='/upload'>
                        Upload
                    </Link>
                </li>
            </ul>
            }
    </section>
    <section className='homeAndLogOut'>
        {loggedInUserContext &&
        <Link to={`/profileOfArtist/${loggedInUserContext._id}`}>
            Home
        </Link>
        }
        <Link to='/'>
            <a href='/' className="margin-left2" onClick={logout}>Logout</a>
        </Link>
    </section>
</nav>
    )
}



export default Nav