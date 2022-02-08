import React, {useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import PostField from './PostField'
import PasswordField from './PasswordField'
import NavSidePublic from './NavSidePublic'
import axios from 'axios'
import {Redirect} from "react-router-dom";

const Signup = () => {
    const {setLoggedInUserContext} = useContext(UserContext)
    
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        instagram: '',
        twitter: '',
        cashAppLink: '',
        profilePicture: 'https://res.cloudinary.com/drs4pvb1e/image/upload/v1629230843/Motifs/smiley_djkqgy.png'
    })
    // const [fileInputState, setFileInputState] = useState('')
    const [redirect, setRedirect] = useState(false)

    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    // const handleFileInputChange = (e) => {
    //     const file = e.target.files[0]
    //     setFileInputState(file)
    // }

    // const handleSubmitFile = (e) => {
    //     e.preventDefault()
    //     if(!fileInputState) return
    //     createAccount(fileInputState)
    //     // setUploading(true) 
    // }

    const createAccount = async (e) => {
    console.log('hello from createAccount')    

    e.preventDefault();
    const res = await axios.post('/auth/registerUser', values, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(res)

    const {refreshtoken, accesstoken, userId} = res.data

    if(refreshtoken){
        setLoggedInUserContext({refreshtoken, accesstoken, userId})
        setRedirect(true)
    }else{
        console.log('whoops')
    }
    }
    console.log('hello from signup')
    if(redirect){
        return (
            <Redirect to='/feed' />
        )
    }else{
        return(
        <div className='window'>
            <NavSidePublic />

            <div className="gradient landing">
    
                <div className="stream2 audioAndArt index radius">
                    <div className='formHead padding'>
                        <h1 className="darkGrey margin-top2">Create an account</h1>
                    </div>
    
                        <form   className="uploadForm padding"
                                onSubmit={createAccount}
                            >
                            <div className='field50 flex'>
                                <PostField  
                                    for='userName'
                                    label='User Name'
                                    inputClass='padding-top padding-bottom'
                                    inputType='text'
                                    inputId='userName'
                                    inputName='userName'
                                    value={values.username}
                                    onChange={(e) => updateValue(e)}
                                        
                                />
                                <PostField  
                                    for='email'
                                    label='Email'
                                    inputClass='padding-top padding-bottom'
                                    inputType='email'
                                    inputId='email'
                                    inputName='email'
                                    value={values.email}
                                    onChange={(e) => updateValue(e)}
                                        
                                />
                            </div>   
                            <div className="postField margin-top passwordField">
                                <PasswordField  
                                    for='password'
                                    label='Password'
                                    inputClass='padding-top padding-bottom'
                                    inputType='password'
                                    inputId='password'
                                    inputName='password'
                                    value={values.password}
                                    onChange={(e) => updateValue(e)}
                                        
                                />
                                <PasswordField  
                                    for='confirmPassword'
                                    label='Confirm Password'
                                    inputClass='padding-top padding-bottom'
                                    inputType='password'
                                    inputId='confirmPassword'
                                    inputName='confirmPassword'
                                    value={values.confirmPassword}
                                    onChange={(e) => updateValue(e)}
                                        
                                />
                            </div>
                            <div className='field50 flex'>
                                <PostField  
                                        for='instagram'
                                        label='Instagram'
                                        inputClass='padding-top padding-bottom'
                                        inputType='instagram'
                                        inputId='instagram'
                                        inputName='instagram'
                                        value={values.instagram}
                                        onChange={(e) => updateValue(e)}
                                        required={false}
                                            
                                />
                                <PostField  
                                        for='twitter'
                                        label='Twitter'
                                        inputClass='padding-top padding-bottom'
                                        inputType='twitter'
                                        inputId='twitter'
                                        inputName='twitter'
                                        value={values.twitter}
                                        onChange={(e) => updateValue(e)}
                                        required={false}
                                            
                                />
                            </div>
                            <div className='field50 flex column'>

                            <PostField  
                                    for='cashAppLink'
                                    label='Donation Link (Cash app, Venmo or paypal)'
                                    inputClass='padding-top padding-bottom'
                                    inputType='cashAppLink'
                                    inputId='cashAppLink'
                                    inputName='cashAppLink'
                                    value={values.cashAppLink}
                                    onChange={(e) => updateValue(e)}
                                    required={false}
                                        
                            />
                            </div>
                            <div className="postField margin-top2 margin-bottom2">
                                <button type="submit" 
                                        className="trackBtn padding-top padding-bottom" 
                                        value="Upload">Sign Up
                                </button>
                            </div> 
    
                        </form> 
    
                </div>
            </div>
        </div>    
     
        )
    }
}
export default Signup