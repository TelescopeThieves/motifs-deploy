import React from 'react'
import { Link } from 'react-router-dom'



const FollowBlock = (props) =>{
    return (
        <div className='followBlock'>
            <div>
                <Link to={`/getProfileOfArtist/${props.id}`}>
                    <img class="radius" src={props.src} alt=""></img>    
                </Link>
            </div>
            <div>
                <Link to={`/getProfileOfArtist/${props.id}`}>
                    <h2 className='darkGrey margin-top'>{props.userName}</h2>   
                </Link>
            </div>
        </div>
    )
}

export default FollowBlock