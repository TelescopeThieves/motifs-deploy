import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { Planet } from "phosphor-react";




const Nav = () => {
    const {loggedInUser, setLoggedInUser, logout} = useContext(UserContext)

    const logoutFunc = async () => {

            // await fetch('/auth/logout', {
            //     method: 'POST',
            //     credentials: 'include', // Needed to include the cookie
            //   });
            //   // Clear user from context
            //   setLoggedInUser({});
            logout();
    }
    // if(loggedOut){
    //     return(
    //         <Redirect to='/' />
    //     )
    // }
    return(

        <nav className="padding-top padding-bottom padding-left padding-right">
        <section className="navigation">

            <Link to="/">
                <h1>Motifs</h1>
            </Link>
            {loggedInUser.refreshtoken &&
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
        {loggedInUser.refreshtoken &&
        <Link to={`/profileOfArtist/${loggedInUser._id}`}>
            Home
        </Link>
        }
        <Link to='/'>
            <a href='/' className="margin-left2" onClick={logoutFunc}>Logout</a>
        </Link>
    </section>
</nav>
    )
}



export default Nav