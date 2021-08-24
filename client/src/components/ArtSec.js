import React from 'react'
import {Link} from 'react-router-dom'



const ArtSec = (props) => {
    return(
        
        <div className="artSec padding">
            <img src={props.imgLink} alt='Cover Art'/>
        </div>
       
    )
}



export default ArtSec