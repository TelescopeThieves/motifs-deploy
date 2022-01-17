import React from 'react'
import { Link } from "react-router-dom";
import StyledButton from "./styled/StyledButton"

const ButtonStyled = (props) => {

    return(
        
        <Link to={props.link}>
            <StyledButton onClick={props.onClick} value={props.value} bg={props.bg} color={props.color}>
                {props.svg}
                <span>{props.name}</span>
            </StyledButton>
        </Link>       
    )
}



export default ButtonStyled