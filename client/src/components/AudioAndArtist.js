import React, {useState} from 'react';
import { Smiley, InstagramLogo, TwitterLogo, CurrencyCircleDollar, Heart } from "phosphor-react";
import ButtonStyled from './ButtonStyled';
import AaContainer from './styled/AaContainer';
import ArtistDiv from './styled/ArtistDiv';
import AudioDiv from './styled/AudioDiv';
import ProfileDiv from './styled/ProfileDiv';
import Name from './styled/Name';
import IconDiv from './styled/IconDiv';
import Three from './styled/Three';
 /* 11.089rem */
  /* 6.854rem */
  /* 4.236rem */
  /* 2.618rem */
  /* 1.618rem */
  /* 1rem */
  /* 0.618rem */
  /* 0.382rem */

const AudioAndArtist = (props) => {

    return(
        <AaContainer>
 
            <ArtistDiv>
                
                <ProfileDiv>
                    <Smiley size={48} />
                </ProfileDiv>
                
                <Name>
                    <span>
                        {props.artist}
                    </span>
                </Name>

                {props.followed ?
                <ButtonStyled bg='black' color='#fff' name={props.followed ? 'Following':'Follow'} onClick={() => props.toggleFollow(props.userId)}/>
                :
                <ButtonStyled name={props.followed ? 'Following':'Follow'} onClick={() => props.toggleFollow(props.userId)}/>
                }

                <IconDiv>
                {props.instagram && 
                <a href={props.instagram} target='_blank' rel="noopener noreferrer">
                    <InstagramLogo size={32} /> 
                </a>
                }
                
                {props.twitter  &&
                <a href={props.twitter} target='_blank' rel="noopener noreferrer">
                    <TwitterLogo size={32}  />
                </a> 
                }
                {props.cashLink && 
                <a href={props.cashLink} target='_blank' rel="noopener noreferrer">
                    <CurrencyCircleDollar size={32}  /> 
                </a>
                }
                </IconDiv>
                
            </ArtistDiv>
            <AudioDiv>
                <Three>
                    <span>{props.artist}{` - `}{props.title}</span>
                </Three>
                <Three align='center'>
                    <audio controls preload="none" type='audio/mpeg'>
                        <source src={props.audioSrc}></source>
                    </audio>
                </Three>
                <Three align='flex-end' justify='flex-end' onClick={() => props.toggleBookmark(props.id)}>
                    {props.liked ?
                    <Heart size={32} color={`#5F6FFF`}/>
                    :
                    <Heart size={32} />
                    }
                </Three>
                
                
            </AudioDiv>

        </AaContainer>
    )
}

export default AudioAndArtist