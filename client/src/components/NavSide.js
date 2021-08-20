import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import {ArrowSquareOut, MusicNotesSimple, Planet, GlobeHemisphereWest} from "phosphor-react";





const NavSide = () => {

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    const [loggedOut, setLoggedOut] = useState(false)

    const logout = async (e) => {
        
        e.preventDefault()

        await fetch('/auth/logoutUser', {
            method: 'POST',
            credentials: 'include', // Needed to include the cookie
          });
        // Clear user from context
        setLoggedInUserContext({});
        //redirect to home
        setLoggedOut(true)
    }

    if(loggedOut){
        return(
            <Redirect to='/' />
        )
    }

    return (
        <nav className='navigation padding-top padding-bottom border-right flex column'>
                <div>
                    <Link to='/'>
                        <div className='flex column center padding-bottom padding-left padding-right border-bottom feedLogout'>
                            <Planet size={24} />
                            <span className=''>Motifs</span>
                        </div>
                    </Link>

                    <Link to={`/profileOfArtist/${loggedInUserContext.userId}`}>
                        <div className='flex column center padding-bottom padding-top border-bottom feedLogout'>
                            <GlobeHemisphereWest size={24} />
                            <span className=''>Home</span>
                        </div>
                    </Link>

                    <Link to='/upload'>
                        <div className='flex column center padding-bottom padding-top border-bottom feedLogout'>
                            <MusicNotesSimple size={24} />
                            <span className=''>
                                Upload
                            </span>
                        </div>
                    </Link>
                </div>
                <div className='flex column center padding-top padding-bottom width100 border-top feedLogout' onClick={logout}>
                        <ArrowSquareOut size={24} />
                    <span>
                        Log out
                    </span>
                </div>
            </nav>
    )
}

export default NavSide

