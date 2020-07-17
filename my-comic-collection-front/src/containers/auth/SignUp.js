import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { signUpAction } from "../../actions/currentUserActions.js"
import ClearForm from "../../components/ClearForm"
import SetFocus from "../../components/SetFocus"
import { Redirect } from 'react-router-dom'

const SignUp = () => {

    const [userData, setUserData] = useState({email: '', password: '', password_confirmation: ''})
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (userData.password.length < 8 ) {
            alert('Password must be a minimum of 8 characters!')
            return
        }

        if (userData.password !== userData.password_confirmation) {
            alert('Password and password confirmation must be the same!')
            return
        }
 
        dispatch(signUpAction({ user: userData }))
        // Clear the form
        ClearForm('SignUp-Form')
        // Set focus on the email address
        SetFocus('Focus-SignUp-Email')
    }
       
    if (currentUser) {
        return  <Redirect to={{
            pathname: '/login',
            state: {isFromSignUp: true}
        }}  />
    }

    return (
        
        <div>
            <header className='SignUp'>
                <br />
                <img src={logo} alt='logo' className='Logo'/>
                <div className='SignUp-container'>
                    <form id='SignUp-Form' 
                            onSubmit={handleSubmit}
                    >
                        <div className='Register Center-text'>
                            <div className='SignUp-element Cornsilk-color'>
                                <label>Email: </label>
                                <input autoFocus id='Focus-SignUp-Email' className='SignUp-input-element' required 
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                />
                            </div>
                            <br /> 
                            <div className='SignUp-element Cornsilk-color'>
                                <label>Password: </label>
                                <input className='SignUp-input-element' required 
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                />
                                </div>
                            <br />
                            <div className='SignUp-element Cornsilk-color'>
                                <label>Confirm Password: </label>
                                <input className='SignUp-input-element' required 
                                    type='password'
                                    name='password_confirmation'
                                    onChange={handleChange}
                                />
                            </div>
                            <br />
                            <button className='btn SignUp-button Button-text' type='submit'>Sign Up</button>
                            <Link className='btn SignUp-home-button Button-text Center-text' to={{pathname: '/home'}}> 
                                Home
                            </Link>
                        </div>  
                    </form>
                    
                </div>
            </header>
        </div>
    )
}

export default SignUp