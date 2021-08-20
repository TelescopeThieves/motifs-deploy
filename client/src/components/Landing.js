import React from 'react'
import {Link} from "react-router-dom";

const Landing = () => {

    return(
        <section className="gradient landing">
            <section className="audioAndArt index stream radius padding">
                
                <section>
                    <h1 className="darkGrey bigFont">Welcome to Motifs!</h1>
                </section>

                <section className="indexBtns">

                    <div className="centerText margin-right">
                        <Link to='/signup'>
                            <button type="submit" className="trackBtn padding-top padding-bottom">Create Account</button>
                        </Link>
                    </div>
                    <div className="centerText margin-left">
                        <Link to='/login'>
                            <button type="submit" className="trackBtn padding-top padding-bottom">Login</button>
                        </Link>
                    </div>
                </section>
            </section>
        </section>    

            
    )
}



export default Landing