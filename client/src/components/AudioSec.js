import React from 'react'
import TrackButtons from './TrackButtons'
import {Link} from 'react-router-dom'


const AudioSec = (props) => {
    return(
        
        <div className="audioSec">
            <div className='trackInfo margin-bottom'>
                <Link to={`/profileOfArtist/${props.userWhoCreatedPost}`}>
                    <h2>{`${props.artist} - ${props.title}`}</h2>
                    </Link>
            </div>
            <div className='width100 audioBarDiv'>
                <audio controls preload="none" type='audio/mpeg'>
                    <source src={props.audioSrc}></source>
                </audio>
            </div>
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