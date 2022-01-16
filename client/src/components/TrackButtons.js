import React, { useState, useEffect, useContext} from 'react'
import Button from './Button'
import FormButton from './FormButton'
import axios from 'axios'
import ButtonAnchor from './ButtonAnchor'
import { Share,User,CurrencyCircleDollar, Heart, UserPlus, UserMinus, Trash} from "phosphor-react";
import { UserContext } from '../Context/UserContext'




const TrackButtons = (props) => {

    const {loggedInUserContext} = useContext(UserContext)
    const canDelete = String(props.loggedInUserId) === String(props.userWhoCreatedPost)
    const [bookState, toggle] = useState()
    const [followState, setFollowing] = useState()


    useEffect(() => {
        ( async () => {
            axios.get(`/getSinglePost/${props.id}`, {headers: {Authentication: loggedInUserContext?.accesstoken}})
            .then(({ data }) => {
                toggle(data.user.bookmarks[data.post[0]._id])
                setFollowing(data.user.following.includes(data.artist[0]._id))
            })
            .catch(() => console.log('failed to fetch from url'))
            }
        )()
    }, [props.id]);

    function toggleBookmark(){

        (async () => {
            await axios.post(`/post/likePost/${props.id}?_method=PUT`,{},{headers: {Authentication: loggedInUserContext?.accesstoken}})
        })()
        toggle(!bookState)
    }
    function toggleFollowButton(){

        (async () => {
            await axios.post(`/post/followArtist/${props.userWhoCreatedPost}?_method=PUT`,{}, {headers: {Authentication: loggedInUserContext?.accesstoken}})
        })()
        setFollowing(!followState)
    }
    function deleteTrack(){

        (async () => {
            await axios.post(`/post/deletePost/${props.id}?_method=DELETE`,{}, {headers: {Authentication: loggedInUserContext?.accesstoken}})
        })()
        window.location.reload()
    }
    
       
        return(
            <div className='trackBtns'>
                <div className='formBtn'>
    
                    <button className={bookState ? "trackBtn clicked" : 'trackBtn'}
                            onClick={() => toggleBookmark()}
                    >
                    {bookState ?
                    <Heart size={24} weight='regular' color='red'/>         
                    :
                    <Heart size={24} weight='regular'/> 
                    
                    }    
                    </button>        
                </div>
    
                <div className='formBtn margin-left'>
                <FormButton 
                            classes={followState ? "trackBtn clicked" : 'trackBtn'} 
                            svg={followState ? <UserMinus size={24} /> : <UserPlus size={24}/>}
                            name={followState ? `Unfollow` : `Follow`}
                            onClick={() => toggleFollowButton()}
                            />  
                </div>
                           
                <div className='formBtn margin-left'>
                    <ButtonAnchor classes="trackBtn" 
                            svg={<CurrencyCircleDollar size={24}/>} 
                            name="CashApp" 
                            target="_blank" 
                            link={props.cashAppLink}
                            />
                </div>

    
                {/* <div className='formBtn margin-left'>
                    <Button 
                            classes="trackBtn" 
                            svg={<Share size={24} />} 
                            name="Share"
                            data-share-url={`https://motifs.herokuapp.com/getSinglePost/${props.id}`}
                            />
                </div> */}
    
                {!canDelete &&
                
                <div className='formBtn margin-left'>
                    <Button 
                            classes="trackBtn" 
                            // svg={<User size={24}/>} 
                            name="Profile"
                            link={`/profileOfArtist/${props.userWhoCreatedPost}`}
                            />
                </div>
                }
                {canDelete &&
                <form className='formBtn margin-left'
                            >
                    <Button 
                            classes="trackBtn" 
                            svg={<Trash size={24} />} 
                            name="Delete"
                            onClick={() => deleteTrack()}
                            />
                </form>
                }
            </div>
            
           
        )
}



export default TrackButtons