import React from 'react'
import { Link } from "react-router-dom";




const ButtonWhite = (props) => {

    const styles = {
        buttonWhite:{
            width: '10rem',
            backgroundColor: 'white',
            border: `none`,
            borderRadius: `.5rem`,
            padding: `.5rem 0`
        }
    }
    return(
        
        <Link to={props.link}>
            <button className={props.classes} 
                    type="submit" 
                    onClick={props.onClick} 
                    value={props.value} 
                    style={styles.buttonWhite}>
                        {props.svg}
                        <span style={props.spanStyle}>{props.name}</span>
            </button>
        </Link>       
    )
}



export default ButtonWhite