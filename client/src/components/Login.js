import React, { useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import PostField from './PostField';
import NavSidePublic from './NavSidePublic';

const Login = () => {


    const { login} = useContext(UserContext)

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

    const loginToAccount = async (e) => {
        e.preventDefault()
        login(values);                         
    }

    return (
        <div className='window'>
            <NavSidePublic />
            <div className="gradient landing">
                <div className="stream audioAndArt index radius loginForm">
                    <div className='formHead padding'>
                        <h1>Login</h1>
                    </div>
                    <form
                        className='uploadForm padding'
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
                            <button  
                            className="trackBtn padding-top padding-bottom"
                            onClick={(e) => loginToAccount(e)}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
}

export default Login