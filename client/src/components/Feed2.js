import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import NavSide2 from './NavSide2'
import AudioAndArtist from './AudioAndArtist'
import Window from './styled/Window'
import FeedContainer from './styled/FeedContainer'




const Feed2 = () => {

    const [updateSent, setUpdateSent] = useState(false)
    
    const {loggedInUser} = useContext(UserContext)
    
    const [isLoading, setIsLoading] = useState(true)
    
    
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

    const toggleBookmark = async (id, toggle) => {
        const res = await axios.post(`/post/bookmarkPost/${id}/${toggle}?_method=PUT`,{},{headers: {Authentication: loggedInUser?.accesstoken}})
        
        if(res){
            console.log(res.data.msg)
            setUpdateSent(prev => !prev)
        }
    }

    const toggleFollow = async (id) => {

        const res = await axios.post(`/post/followArtist/${id}?_method=PUT`,{}, {headers: {Authentication: loggedInUser?.accesstoken}})
        
        if(res){
            console.log(res.data.msg)
            setUpdateSent(prev => !prev)
        }
    }

    const isBookmarked = (user, postId) => {
        let bookmarkStatus = null;
        if(typeof user.bookmarks[0] === 'string'){ // if ObjectID
            bookmarkStatus = user.bookmarks.includes(postId) 
        } else { // if populated object
            bookmarkStatus = user.bookmarks.some(bookmark => bookmark._id === postId)             
        }
        return bookmarkStatus
    }

    
    useEffect(() => {
        getFeed(sort.url)
    }, [sort.url, updateSent]);

    const {posts, user} = feed
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
                                    bookmarked={() => isBookmarked(user, post._id)}
                                    followed={user?.following?.[post.user]?.following || false}
                                    toggleBookmark={toggleBookmark}
                                    toggleFollow={toggleFollow}
                                    setUpdateSent={setUpdateSent}
                        />
            })}
            </FeedContainer>
        </Window>
            
        )
}
export default Feed2