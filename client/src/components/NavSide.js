import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import {ArrowSquareOut, MusicNotesSimple, Planet, GlobeHemisphereWest} from "phosphor-react";





const NavSide = () => {

    const {loggedInUser, logout} = useContext(UserContext)

    const logoutFunc = async (e) => {        
        e.preventDefault()
        logout();
    }

    return (
        <nav className='navigation padding-top padding-bottom border-right flex column'>
                <div className='width100'>
                    <Link to='/'>
                        <div className='flex column center padding-bottom padding-left padding-right border-bottom feedLogout'>
                            <Planet size={24} />
                            <span className=''>Motifs</span>
                        </div>
                    </Link>

                    <Link to={`/profileOfArtist/${loggedInUser.userId}`}>
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
                <div className='flex column center padding-top padding-bottom width100 border-top feedLogout' onClick={logoutFunc}>
                        <ArrowSquareOut size={24} />
                    <span>
                        Log out
                    </span>
                </div>
            </nav>
    )
}

export default NavSide

