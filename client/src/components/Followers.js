import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import FollowBlock from './FollowBlock'

const Followers = () => {

    const artistId = useParams()

    const [loggedInUser, setloggedInUser] = useState(null)
    const [followers, setFollowers] = useState(null)

    useEffect(() => {
        ( async () => {
            axios.get(`/followers/${artistId.followedBy}/${artistId.id}`)
            .then(({ data }) => {
                console.log(data)
                setloggedInUser(data.user)
                setFollowers(data.followers)
            })
            .catch(() => console.log('failed to fetch from url'))
            }
        )()
    }, [artistId.id, artistId.followedBy]);

    if(loggedInUser && followers){
        
        return (
    
            <div className="gradient profileLanding">
                <div className="isFollow margin-bottom2">
                    <Link to={`/profileOfArtist/${loggedInUser._id}`} className='darkGrey'>
                        <h2>{loggedInUser.userName} is {artistId.followedBy === 'followers' ? 'followed by' : `following`}:</h2>
                    </Link>
                    <div className="profileSec followerSec radius padding margin-bottom2">
                        {followers.map(follower =>{
                            return <FollowBlock
                                    id={follower._id}
                                    src={follower.profilePicture}
                                    userName={follower.userName}
                                    />
                        })}

                    </div>
                </div>

            </div>
        )
    } else{
        return (
            <div>Loading...</div>
        )
    }
}

export default Followers