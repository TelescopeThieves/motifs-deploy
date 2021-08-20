import React from 'react'

const PostTextArea = (props) => {
    return (
        <div className="postField margin-top2">
            <label htmlFor={props.for}>{props.label}</label>
            <textarea   className={props.inputClass} 
                        type={props.inputType} 
                        id={props.inputId} 
                        name={props.inputName}
                        rows={props.rows}
                        value={props.value}
                        onChange={props.onChange}
                        required
                    >
            </textarea>
        </div>
    )
}

export default PostTextArea