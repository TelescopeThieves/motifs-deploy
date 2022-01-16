import React, {useState, useContext } from 'react'
import {Link, Redirect} from "react-router-dom";
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import Button from './Button';


const Landing = () => {
    const {loggedInUser, setLoggedInUser, login} = useContext(UserContext)
    const guest = {
        email: "guest@guest.com",
        password: "12341234"
    }
    const guestLogin = async () => {

        // const res = await axios.post('/auth/login', guest)
            
        // const {refreshtoken, accesstoken, userId} = res.data

        // if(refreshtoken){
        //     setLoggedInUser({refreshtoken, accesstoken, userId})
        // }else{
        //     console.log('whoops')
        // }
        login(guest);
    }
    // if(redirect){
    //     return (
    //         <Redirect to='/feed' />
    //     )
    // }
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