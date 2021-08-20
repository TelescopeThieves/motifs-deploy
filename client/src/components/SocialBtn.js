import React from 'react'

const styles = {
    socialDiv:{
        display: 'flex',
        alignItems: 'center'
    }
}

const SocialBtn = (props) => {

    return(
            <div style={styles.socialDiv}>
                <a className={props.iconClass} href={props.link} target='_blank' rel="noreferrer">
                    <i className={props.icon}></i>
                 </a>
                <a href={props.link} target='_blank' rel="noreferrer">
                    <span>{props.name}</span>   
                </a> 
            </div>
       
    )
}



export default SocialBtn