import React, { useState, useEffect, useContext } from 'react'
import AudioAndArt from './AudioAndArt'
import SortSec from './SortSec'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { Link, Redirect } from 'react-router-dom'
import {ArrowSquareOut, MusicNotesSimple, Planet} from "phosphor-react";
import NavSide from './NavSide'



const Feed = () => {
    const [loggedOut, setLoggedOut] = useState(false)

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true) 
    
    const [feed, setFeed] = useState({
        posts: [],
        user: {}
    });

    const [sort, setSort] = useState({
        url: '/feed' 
    
    })
    const [sortClass, setSortClass] = useState({
        all: "sortSecBtn clicked",
        bookmark: "sortSecBtn margin-left2",
        followingFeed: "sortSecBtn margin-left2",
        color:'black'
    })

    function switchToMasterFeed(){
        setSort({
            url :`/feed`,
        })
        setSortClass({
            all: "sortSecBtn clicked",
            bookmark: "sortSecBtn margin-left2",
            followingFeed: "sortSecBtn margin-left2",
            color:'black'
        }) 
    }
    function switchToBookmarkFeed(){
        setSort({
            url :`/library`,
        })
        setSortClass({
            all: "sortSecBtn",
            bookmark: "sortSecBtn margin-left2 clicked",
            followingFeed: "sortSecBtn margin-left2",
            color:'red'
        })  
    }
    function switchToFollowingFeed(){
        setSort({
            url :`/followingFeed`,
        })
        setSortClass({
            all: "sortSecBtn",
            bookmark: "sortSecBtn margin-left2",
            followingFeed: "sortSecBtn margin-left2 clicked",
            color:'black'
        })  
    }

    const getFeed = async (url) => {

        const res = await axios.get(url, {headers: {Authentication: loggedInUserContext?.accesstoken}})

        setFeed({
            posts: res.data.posts,
            user: res.data.user
        })
        setIsLoading(false)
    }

    const logout = async () => {

        await fetch('/auth/logoutUser', {
            method: 'POST',
            credentials: 'include', // Needed to include the cookie
          });
          // Clear user from context
          setLoggedInUserContext({});
          setLoggedOut(true)
    }
    
    useEffect(() => {
        getFeed(sort.url)
    }, [sort.url]);

    const {posts, user} = feed
    
    if(isLoading){
        return <div>is loading...</div>
    }
    if(loggedOut){
        return(
            <Redirect to='/' />
        )
    }
    return(
        <div className='window'>
            <NavSide />
            <div className='gradient landing'>
                <div className='stream padding radius'>
                    <div className='flex width90 justifySpaceBetween'>
                        <div className='width10 flex alignCenter'>
                            <span>Sort by:</span>
                        </div>
                        <SortSec 
                            onClickAll={() => switchToMasterFeed()} 
                            onClickBookmark={() => switchToBookmarkFeed()}
                            onClickFollow={() => switchToFollowingFeed()}
                            sortClassAll={sortClass.all}
                            sortClassBookmark={sortClass.bookmark}
                            sortClassFollow={sortClass.followingFeed}
                            sortColor={sortClass.color}
                        />
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
                                            loggedInUser={user}
                                            loggedInUserId={user._id}
                                            post={post}
                                            isBookmarked={user.bookmarks[post._id]}

                                />
                            })}
                </div>
            </div>
        </div>
           
        )
}
export default Feed