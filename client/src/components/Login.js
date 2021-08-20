import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import PostField from './PostField';
import NavSidePublic from './NavSidePublic';

const Login = () => {


    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    const [values, setValues] = useState({
        email: '',
        password: '',
        })


    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        loginToAccount()
    }

    const loginToAccount = async () => {


        const res = await axios.post('/auth/loginUser', values)
        
        console.log(res.data)
        
        const {refreshtoken, accesstoken, userId} = res.data

        if(refreshtoken){
            setLoggedInUserContext({refreshtoken, accesstoken, userId})
            setRedirect(true)
        }else{
            console.log('whoops')
        }
                                
    }

if(redirect){
    return(
        <Redirect to='/feed' />
    )
} else{

    return (
        <div>
            <NavSidePublic />
            <div className="gradient landing">
                <div className="stream audioAndArt index radius loginForm">
                    <div className='formHead padding'>
                        <h1>Login</h1>
                    </div>
                    <form
                        className='uploadForm padding'
                        onSubmit={handleSubmitFile}
                    >
                        <div className=''>

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
                        <PostField  
                                for='password'
                                label='Password'
                                inputClass='padding-top padding-bottom'
                                inputType='password'
                                inputId='password'
                                inputName='password'
                                value={values.password}
                                onChange={(e) => updateValue(e)}
                                />
                        </div>
                        <div className="postField margin-top2">
                            <button type='submit' className="trackBtn padding-top padding-bottom">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
}

}

export default Login