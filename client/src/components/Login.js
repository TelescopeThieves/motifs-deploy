import React, { useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import PostField from './PostField';
import NavSidePublic from './NavSidePublic';
import { emailSchema, passwordSchema} from '../formValidation';

const Login = () => {


    const { login, resErrors} = useContext(UserContext)

    const [values, setValues] = useState({
        email: '',
        password: '',
        })

     //set errors state
    const [errors, setErrors] = useState({});


    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

      //handle blur and validate
    function handleBlur(e) {
        const { name } = e.target;
        console.log(name);
        const schemas = { emailSchema, passwordSchema };
        schemas[`${name}Schema`]
        .validate({ [name]: values[name] })
        .then((_) => setErrors((prevErrors) => ({ ...prevErrors, [name]: null })))
        .catch(({ errors: err }) => {
            if (errors[0].includes('/^(?=.*?[#?!@$ %^&*-])/')) {
                errors[0] = 'password must contain one of the following symbols: #?!@$ %^&*'
            } else if (errors[0].includes('/^(?=.*?[A-Z])/')) {
                errors[0] = 'password must contain a capital letter'
            }
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errors[0] }))
        }
        );
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
                        {errors.email && <p id='email-error' style={{color: 'darkred'}}>{errors.email}</p>}
                        <PostField  
                                for='email'
                                label='Email'
                                inputClass='padding-top padding-bottom'
                                inputType='email'
                                inputId='email'
                                inputName='email'
                                value={values.email}
                                onChange={(e) => updateValue(e)}
                                onBlur={(e) => handleBlur(e)}
                                aria-describedby="email-error"
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
                                onBlur={(e) => handleBlur(e)}
                                aria-describedby="password-error"
                                />
                            {errors.password && <p id='password-error' style={{color: 'darkred'}}>{errors.password}</p>}
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