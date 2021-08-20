
import React, { useState, useEffect, useContext } from 'react'
import FormButton from './FormButton'
import axios from 'axios'
import { InstagramLogo, TwitterLogo, CurrencyCircleDollar, UserPlus, UserMinus} from "phosphor-react";
import { UserContext } from '../Context/UserContext'


const UserInfo = (props) => {

    const {loggedInUserContext} = useContext(UserContext)

    const [followState, setFollowState] = useState(props.followCheck)
    useEffect(() => {
        ( async () => {
            axios.get(`/getProfileOfArtist/${props.id}`, {headers: {Authentication: loggedInUserContext?.accesstoken}})
            .then(({ data }) => {
                setFollowState(data.user.following.includes(props.id))
            })
            .catch(() => console.log('failed to fetch from url'))
            }
        )()
    }, [props.id]);

    function toggleFollowButton(){

        (async () => {
            axios.post(`/post/followArtist/${props.id}?_method=PUT`)
            setFollowState(!followState)
        })()
    }
    return(    
        <div className="userInfo padding">

            {/* <span className="darkGrey margin-top2">{props.artistName}</span> */}

            <div className="socials margin-top2">
                
                <FormButton 
                        classes={followState ? "trackBtn clicked" : 'trackBtn'} 
                        svg={followState ? <UserMinus size={24}  /> : <UserPlus size={24} />}
                        name={followState ? `Unfollow` : `Follow`}
                        onClick={() => toggleFollowButton()}
                        />  
            </div>  
            <div className="socials margin-top2 userInfoIcons">
                
                {props.artist.instagram && 
                <a href={props.artist.instagram} target='_blank' rel="noopener noreferrer">
                    <InstagramLogo size={32} /> 
                </a>
                }
                
                {props.artist.twitter  &&
                <a href={props.artist.twitter} target='_blank' rel="noopener noreferrer">
                    <TwitterLogo size={32}  />
                </a> 
                }
                {props.artist.cashAppLink && 
                <a href={props.artist.cashAppLink} target='_blank' rel="noopener noreferrer">
                    <CurrencyCircleDollar size={32}  /> 
                </a>
                }
            </div>                          
            
        </div>
       
    )
}

export default UserInfo




