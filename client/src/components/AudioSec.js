import React from 'react'
import TrackButtons from './TrackButtons'
import {Link} from 'react-router-dom'


const AudioSec = (props) => {
    return(
        
        <div className="audioSec">
            <div className='trackInfo margin-bottom'>
                <Link to={`/singlePost/${props.id}`}><h2>{`${props.artist} - ${props.title}`}</h2></Link>
            </div>
            <audio controls preload="none" type='audio/mpeg'>
                <source src={props.audioSrc}></source>
            </audio>
            <TrackButtons 
                        id={props.id} 
                        cashAppLink={props.cashAppLink}
                        loggedInUser={props.loggedInUser}
                        loggedInUserId={props.loggedInUserId}
                        post={props.post}
                        userWhoCreatedPost={props.userWhoCreatedPost} 
            />
        </div>
       
    )
}



export default AudioSec