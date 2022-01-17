import React, { useContext } from 'react'
import {Link } from "react-router-dom";
import { UserContext } from '../Context/UserContext'
import Button from './Button';


const Landing = () => {
    const {login} = useContext(UserContext)
    const guest = {
        email: "guest@guest.com",
        password: "12341234"
    }
    const guestLogin = async () => {

        login(guest);
    }
    return(
        <section className="gradient landing">
            <section>
                
                <section className='width100 padding'>
                    <h1 className="darkGrey bigFont">Welcome to Motifs!</h1>
                </section>
                <div className='padding'>
                    <p>The world's only ephemeral audio site! All audio posted will self-destruct from the site in 24 hours. </p>
                </div>

                <section className="indexBtns padding">

                    <div className="centerText margin-right">
                        <Link to='/signup'>
                            <button type="submit" className="trackBtn padding-top padding-bottom">Create Account</button>
                        </Link>
                    </div>
                    <div className="centerText margin-right">
                        <Link to='/login'>
                            <button type="submit" className="trackBtn padding-top padding-bottom">Login</button>
                        </Link>
                    </div>
                    <div className="centerText">
                        
                        <Button 
                        classes='trackBtn padding-top padding-bottom'
                        onClick={guestLogin}
                        value='Guest Login'
                        name='Guest Login'
                        />

                    </div>
                </section>
            </section>
        </section>    

            
    )
}



export default Landing