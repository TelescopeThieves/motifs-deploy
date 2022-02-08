import React from 'react'

const PostField = (props) => {
    return (
        <div className="postField margin-top2">
            <label htmlFor={props.for}>{props.label}</label>
            <input  className={props.inputClass} 
                    type={props.inputType} 
                    id={props.inputId} 
                    name={props.inputName}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    required={props.required ? props.required : true}
                    >
            </input>
        </div>
    )
}

export default PostField