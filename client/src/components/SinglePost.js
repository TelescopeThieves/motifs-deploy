import React, { useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TrackButtons from './TrackButtons'
import { UserContext } from '../Context/UserContext'
import NavSide from './NavSide'

const SinglePost = () => {

    const {loggedInUser} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)    
    const [singlePostValues, setSinglePostValues] = useState({
        artist: [],
        post: [],
        loggedInUser: {},
        isBookmarked: false
    })
    const postId = useParams()
    useEffect(() => {
        ( async () => {
            axios.get(`/getSinglePost/${postId.id}`, {headers: {Authentication: loggedInUser?.accesstoken}})
            .then(({ data }) => {
                setSinglePostValues({
                    'artist': data.artist[0],
                    'post': data.post[0],
                    'loggedInUser': data.user,
                    'isBookmarked': data.user.bookmarks[data.post[0]._id],
                    'isFollowed': data.user.following[data.artist[0]._id]
                })
                setIsLoading(false)
            })
            .catch(() => console.log('failed to fetch from url'))
            }
        )()
    }, [postId.id, loggedInUser?.accesstoken]);

    const {artist, post, isBookmarked, isFollowed} = singlePostValues
    
    if(!isLoading){
        return(
            <div>
                <NavSide />
                <div className="gradient landing">

                    <div className='audioAndArt singlePostSec radius padding'>
                        

                        <div class="artSec padding">
                            <img src={post.art}  alt="cover art"></img>
                        </div>
                        
                        <div className="trackInfo margin-bottom">
                            <h2>{`${post.artist} - ${post.title}`}</h2>
                        </div>

                        <div className='audioSec'>
                            <audio controls preload="none" type='audio/mpeg'>
                                <source src={post.audio}></source>
                            </audio>
                            <TrackButtons  id={post._id} 
                                            cashAppLink={post.cashAppLink}
                                            loggedInUser={loggedInUser}
                                            loggedInUserId={loggedInUser.id}
                                            post={post}
                                            userWhoCreatedPost={artist._id}
                                            isBookmarked={isBookmarked}
                                            isThisArtistFollowed={isFollowed}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div>is loading...</div>
        )
    }
}


export default SinglePost
