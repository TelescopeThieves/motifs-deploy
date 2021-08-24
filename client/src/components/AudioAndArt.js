import React from 'react'
import ArtSec from './ArtSec'
import AudioSec from './AudioSec'


const AudioAndArt = (props) => {
    return(
        
<div className="audioAndArt radius">

        <ArtSec     imgLink={props.imgLink}
                    artist={props.artist}
                    title={props.title}
                    />
        <AudioSec   
                    audioSrc={props.audioSrc}
                    artist={props.artist}
                    cashAppLink={props.cashAppLink}
                    id={props.id} 
                    title={props.title}
                    loggedInUser={props.loggedInUser}
                    loggedInUserId={props.loggedInUserId}
                    post={props.post}
                    userWhoCreatedPost={props.userWhoCreatedPost}
                    link={props.link}
                    />
</div>
       
    )
}

export default AudioAndArt