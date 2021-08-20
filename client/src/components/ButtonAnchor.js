import React from 'react'



const ButtonAnchor = (props) => {

    return(
        
        <a href={props.link} target={props.target}>
        {/* <Link to={props.link}> */}
            <button className={props.classes} type="submit" onClick={props.onClick} value={props.value}>
                {props.svg}
                <span className='hidden margin-left'>{props.name}</span>
            </button>
        {/* </Link> */}
        </a>
       
    )
}



export default ButtonAnchor