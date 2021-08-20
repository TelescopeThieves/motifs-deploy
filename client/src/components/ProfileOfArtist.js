import React, { useState, useEffect, useContext } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import axios from 'axios'
import AudioAndArt from './AudioAndArt'
import UserInfo from './UserInfo'
import {ArrowCircleDown} from "phosphor-react";
import { UserContext } from '../Context/UserContext'
import NavSide from './NavSide'

const ProfileOfArtist = () => {

const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

const [isLoading, setIsLoading] = useState(true)
const [loggedOut, setLoggedOut] = useState(false)

const [feed, setFeed] = useState({
    posts: [],
    loggedInUser: {},
    artist: {},
    following: [],
    dataBack: {}
});

const artistId = useParams()

const {artist, posts, loggedInUser, following} = feed

useEffect(() => {
    ( async () => {
        axios.get(`/getProfileOfArtist/${artistId.id}`, {headers: {Authentication: loggedInUserContext?.accesstoken}})
        .then(({ data }) => {
            setFeed({
                dataBack: data,
                posts: data.posts,
                loggedInUser: data.user,
                artist: data.artist[0],
                following: data.user.following.includes(artist._id)
            })
            setIsLoading(false)
        })
        .catch(() => console.log('failed to fetch from url'))
        }
    )()
    
    

    }, [artistId.id, artist._id]);

    if(isLoading){
        return (
            <div>is loading ...</div>
        )
    }

    if(loggedOut){
        return (
            <Redirect to='/' />
        )
    }

    return(
        <div>
            <NavSide />
            <div className='gradient landing'>
        
                <div className='profileHead'>
                    
                    <section className="profileSec radius">

                        <div className='profileImg '>

                            <div className='imgBox'>
                                <div className='padding imgBoxImage'>
                                    <img src={artist.profilePicture} alt='profile' className='radius'></img>
                                </div>
                                <div className='artistNameDiv'>
                                    <h1 className=''>{artist.userName}</h1>
                                    <h2>Planet Earth</h2>
                                </div>
                            </div>
                        <div className='flex justifySpaceBetween'>
                            <UserInfo   artistName={artist.userName}
                                        loggedIn={loggedInUser}
                                        id={artist._id}
                                        artist={artist}
                                        followCheck={following}
                            />
                            <div className='flex width60'>
                                <div className='flex column center padding border-right width50'>
                                    <h2 className='margin-bottom'>Followers:</h2>
                                    <span className=''>{artist.followers.length}</span>
                                </div>
                                <div className='flex column center padding width50'>
                                    <h2 className='margin-bottom'>Following:</h2>
                                    <span>{artist.following.length}</span>
                                </div>
                            </div>
                            <div className='padding flex column center border-left width30'>
                                <h2 className='margin-bottom'>Audio</h2>
                                <HashLink to='#audio'>
                                    <ArrowCircleDown size={32} color={`rgba(23, 0, 51, 1)`}/>
                                </HashLink>
                            </div>

                        </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className='landing gradient'>
                <a id='audio'></a>
                <div>
                    <h2>Audio:</h2>     
                </div>
                {posts.map((post,i) =>{
                        return <AudioAndArt  
                                            key={i}
                                            audioSrc={post.audio} 
                                            id={post._id} 
                                            userWhoCreatedPost={post.user} 
                                            artist={post.artist}
                                            title={post.title}
                                            imgLink={post.art}
                                            cashAppLink={post.cashAppLink}
                                            loggedInUser={loggedInUser}
                                            loggedInUserId={loggedInUser._id}
                                            followCheck={loggedInUser.following.includes(post.user)}
                                />
                    })}
            </div>
        </div>
    )

}

export default ProfileOfArtist