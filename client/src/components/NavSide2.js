
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, MusicNotes, Gear} from "phosphor-react";
import { UserContext } from '../Context/UserContext';
import SideNav from './styled/SideNav';
import NavDiv from './styled/NavDiv';


const NavSide2 = (props) => {
    const {logout} = useContext(UserContext)

    return(
        <SideNav>
            <Link to='/'>
                <h1>Motifs</h1>
            </Link>
            <div>
                <div>
                    <h2>Sort by</h2>
                </div>
                {props.sortClass.all ? 
                <NavDiv clicked onClick={props.onClickAll}>
                        <MusicNotes size={24} color={props.clicked}/>
                        <span>All</span>
                </NavDiv>
                :
                <NavDiv onClick={props.onClickAll}>
                        <MusicNotes size={24} color={props.clicked}/>
                        <span>All</span>
                </NavDiv>
                }
                {props.sortClass.following ? 
                    <NavDiv clicked onClick={props.onClickFollow}>
                        <User size={24} weight='regular'/>
                        <span>Following</span>
                    </NavDiv>
                    :
                    <NavDiv onClick={props.onClickFollow}>
                        <User size={24} weight='regular'/>
                        <span>Following</span>
                    </NavDiv>
                }
                {props.sortClass.bookmarked ? 
                <NavDiv clicked onClick={props.onClickBookmark}>
                    <Heart size={24} weight='regular'/>
                    <span>Bookmarked</span> 
                </NavDiv>
                :
                <NavDiv onClick={props.onClickBookmark}>
                    <Heart size={24} weight='regular'/>
                    <span>Bookmarked</span> 
                </NavDiv> 
                }
            </div>
            <NavDiv onClick={logout}>
                <Gear size={24} weight='regular'/>
                <span>Log Out</span> 
            </NavDiv>
        </SideNav>
       
    )
}

export default NavSide2