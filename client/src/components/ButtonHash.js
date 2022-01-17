import React from 'react'
import { HashLink } from 'react-router-hash-link'





const ButtonHash = (props) => {

    return(
        
        <HashLink to={props.link}>
            <button className={props.classes} type="submit" onClick={props.onClick} value={props.value}>
                {props.svg}
                <span className='hidden margin-left'>{props.name}</span>
            </button>
        </HashLink>       
    )
}



export default ButtonHash