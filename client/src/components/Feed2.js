import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { Link, Redirect } from 'react-router-dom'
import NavSide2 from './NavSide2'
import AudioAndArtist from './AudioAndArtist'
import Window from './styled/Window'
import FeedContainer from './styled/FeedContainer'




const Feed2 = () => {

    
    const {loggedInUser} = useContext(UserContext)
    
    const [isLoading, setIsLoading] = useState(true)
    
    const [updateSent, setUpdateSent] = useState(false)
    
    const [feed, setFeed] = useState({
        posts: [],
        user: {}
    });

    const [sort, setSort] = useState({
        url: '/feed' 
    
    })
    const [sortClass, setSortClass] = useState({
        all: true,
        following: false,
        bookmarked: false
    })

    function switchToMasterFeed(){
        setSort({
            url :`/feed`,
        })
        setSortClass({
            all: true,
            following: false,
            bookmarked: false
        }) 
    }
    function switchToBookmarkFeed(){

        setSort({
            url :`/library`,
        })
        setSortClass({
            all: false,
            following: false,
            bookmarked: true
        })  
    }
    function switchToFollowingFeed(){
        setSort({
            url :`/followingFeed`,
        })
        setSortClass({
            all: false,
            following: true,
            bookmarked: false
        })  
    }

    const getFeed = async (url) => {

        const res = await axios.get(url, {headers: {Authentication: loggedInUser?.accesstoken}})

        setFeed({
            posts: res.data.posts,
            user: res.data.user
        })
        setIsLoading(false)
    }

    const toggleBookmark = async (id) => {
        
        const res = await axios.post(`/post/likePost/${id}?_method=PUT`,{},{headers: {Authentication: loggedInUser?.accesstoken}})
        
        if(res){
            
            setUpdateSent(prev => !prev);

        }

    }

    const toggleFollow = async (id) => {

        const res = await axios.post(`/post/followArtist/${id}?_method=PUT`,{}, {headers: {Authentication: loggedInUser?.accesstoken}})

        if(res){
            
            setUpdateSent(prev => !prev);

        }
    }

    
    useEffect(() => {
        getFeed(sort.url)
    }, [sort.url, updateSent]);

    const {posts, user} = feed
    console.log(updateSent)
    if(isLoading){
        return <></>
    }
    return(
        
        <Window>
            <NavSide2 
            onClickAll={() => switchToMasterFeed()} 
            onClickBookmark={() => switchToBookmarkFeed()}
            onClickFollow={() => switchToFollowingFeed()}
            sortClass={sortClass}
            />

            <FeedContainer>
            {posts.map((post) =>{
                return <AudioAndArtist  
                                    key={post._id}
                                    audioSrc={post.audio} 
                                    id={post._id}
                                    userId={post.user}
                                    artist={post.artist}
                                    title={post.title}
                                    cashLink={post.cashAppLink}
                                    instagram={post.instagram}
                                    twitter={post.twitter}
                                    liked={user.bookmarks.includes(post._id)}
                                    followed={user.following.includes(post.user)}
                                    toggleBookmark={toggleBookmark}
                                    toggleFollow={toggleFollow}
                        />
            })}
            </FeedContainer>
        </Window>
            
        )
}
export default Feed2