import React from 'react'
import { Link } from 'react-router-dom'
import {Planet} from "phosphor-react";





const NavSidePublic = () => {


    return (
        <nav className='navigation padding-top padding-bottom border-right flex column'>
                <div>
                    <Link to='/'>
                        <div className='flex column center padding-bottom padding-left padding-right border-bottom feedLogout'>
                            <Planet size={24} />
                            <span className=''>Motifs</span>
                        </div>
                    </Link>

                </div>

            </nav>
    )
}

export default NavSidePublic

