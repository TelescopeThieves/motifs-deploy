import React from 'react';
import { Smiley, InstagramLogo, TwitterLogo, CurrencyCircleDollar, Heart } from "phosphor-react";
import ButtonStyled from './ButtonStyled';
import AaContainer from './styled/AaContainer';
import ArtistDiv from './styled/ArtistDiv';
import AudioDiv from './styled/AudioDiv';
import ProfileDiv from './styled/ProfileDiv';
import Name from './styled/Name';
import IconDiv from './styled/IconDiv';
import Three from './styled/Three';

const AudioAndArtist = ({
    audioSrc,
    postId,
    creatorId,
    artist,
    title,
    cashLink,
    instagram,
    twitter,
    bookmarked,
    followed,
    toggleBookmark,
    toggleFollow}) => {
    const bookmarkToggle = bookmarked ? "unBookmark" : "bookmark";
    const followToggle = followed ? "unFollow" : "follow";
    console.log("follow toggle =>", followToggle);
    return(
        <AaContainer>
 
            <ArtistDiv>
                
                <ProfileDiv>
                    <Smiley size={48} />
                </ProfileDiv>
                
                <Name>
                    <span>
                        {artist}
                    </span>
                </Name>

                {followed ?
                <ButtonStyled bg='black' color='#fff' name={followed ? 'Following':'Follow'} onClick={() => toggleFollow(creatorId, followToggle)}/>
                :
                <ButtonStyled name={followed ? 'Following':'Follow'} onClick={() => toggleFollow(creatorId, followToggle)}/>
                }

                <IconDiv>
                {instagram && 
                <a href={instagram} target='_blank' rel="noopener noreferrer">
                    <InstagramLogo size={32} /> 
                </a>
                }
                
                {twitter  &&
                <a href={twitter} target='_blank' rel="noopener noreferrer">
                    <TwitterLogo size={32}  />
                </a> 
                }
                {cashLink && 
                <a href={cashLink} target='_blank' rel="noopener noreferrer">
                    <CurrencyCircleDollar size={32}  /> 
                </a>
                }
                </IconDiv>
                
            </ArtistDiv>
            <AudioDiv>
                <Three>
                    <span>{artist}{` - `}{title}</span>
                </Three>
                <Three align='center'>
                    <audio controls preload="none" type='audio/mpeg'>
                        <source src={audioSrc}></source>
                    </audio>
                </Three>
                <Three align='flex-end' justify='flex-end' onClick={() => toggleBookmark(postId, bookmarkToggle)}>
                    {bookmarked ?
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