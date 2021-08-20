import React from 'react'
import { Link } from "react-router-dom";




const Button = (props) => {

    return(
        
        <Link to={props.link}>
            <button className={props.classes} type="submit" onClick={props.onClick} value={props.value}>
                {props.svg}
                <span className='hidden margin-left'>{props.name}</span>
            </button>
        </Link>       
    )
}



export default Button