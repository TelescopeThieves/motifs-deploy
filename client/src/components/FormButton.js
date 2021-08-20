import React from 'react'



const FormButton = (props) => {

    return(
        
        
        <button className={props.classes} type="submit" onClick={props.onClick}>
               {props.svg}
               <span className='hidden margin-left'>{props.name}</span>
        </button>
       
    )
}



export default FormButton