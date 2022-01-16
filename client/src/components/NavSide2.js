
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Heart, User, MusicNotes, Gear} from "phosphor-react";
import styled from "styled-components";
import { UserContext } from '../Context/UserContext';



const NavSide = (props) => {
    const {logout} = useContext(UserContext)
    const SideNav = styled.div`
    min-height: 100vh;
    position: fixed;
    width: 25%;
    padding: 4.236rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1{
        font-size: 4.236rem;
        font-weight: 700;
        font-family: 'Calistoga', cursive;
        color: #000;
    }
    h2{
        font-size: 4.236rem;
        color: #7B7A7A;
        padding-bottom: 1rem;
    }
    `
    const NavDiv = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    cursor: pointer;
    span{
        color: #000;
        color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        padding-left: 1rem;
        font-weight: bold;
        font-size: 1.5rem;
    }
    svg{
        path{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        circle{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        line{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        polyline{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
    }
    `

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

export default NavSide