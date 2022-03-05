
import React, {useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Heart, User, MusicNotes, Gear} from "phosphor-react";
import { UserContext } from '../Context/UserContext';
import SideNav from './styled/SideNav';
import NavDiv from './styled/NavDiv';
import ButtonStyled from './ButtonStyled'
import axios from 'axios';


const NavSide2 = (props) => {
    const {logout, loggedInUser} = useContext(UserContext)
    return(
        <SideNav>
            <Link to='/'>
                <h1>Motifs</h1>
            </Link>
            <div>
                <div>
                    <h2>Sort by</h2>
                </div>
                <NavDiv clicked={props.sortClass.all} onClick={props.onClickAll}>
                        <MusicNotes size={24} color={props.clicked}/>
                        <span>All</span>
                </NavDiv>
                <NavDiv clicked={props.sortClass.following} onClick={props.onClickFollow}>
                    <User size={24} weight='regular'/>
                    <span>Following</span>
                </NavDiv>               
                <NavDiv clicked={props.sortClass.bookmarked} onClick={props.onClickBookmark}>
                    <Heart size={24} weight='regular'/>
                    <span>Bookmarked</span> 
                </NavDiv>
            </div>
            <div>
            <ButtonStyled link="/playlists" name="Create Playlist" onClick={ () => {
               axios.post(`/post/playlist/create`,{},{headers: {Authentication: loggedInUser?.accesstoken}})
            }}/>
            </div>
            <NavDiv onClick={logout}>
                <Gear size={24} weight='regular'/>
                <span>Log Out</span> 
            </NavDiv>
        </SideNav>
       
    )
}

export default NavSide2