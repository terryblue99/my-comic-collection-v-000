import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { logInAction } from "../../actions/currentUserActions.js"
import RedirectTo from '../../components/RedirectTo'

const LogIn = (props) => {

    const [userData, setUserData] = useState({email: '', password: ''})
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
        dispatch(logInAction({ user: userData }))
    }
        
    if (currentUser?.logged_in) {
        RedirectTo('/dashboard')
    }

    let isFromSignUp
    if (props.location.state?.isFromSignUp) {
            isFromSignUp = props.location.state.isFromSignUp
    }
    
    return (

        <div className='container'>
            <header className='LogIn'>
                { !isFromSignUp // not a new user
                    ? <p className='LogIn-banner Cornsilk-color Center-text'>Log in to access your watches</p>
                    : <p className='LogIn-banner Cornsilk-color Center-text'>Log in to add your watches</p>
                }
                <img src={logo} alt='logo' className='Logo'/>
                <div className='LogIn-container'>
                    <form id='LogIn-Form'
                            onSubmit={handleSubmit}
                    >
                        <div className='Register Center-text'>
                            <div className='LogIn-element Cornsilk-color'>
                                <label>Email: </label>
                                <input autoFocus className='LogIn-input-element' required 
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                />
                            </div>
                            <br /> 
                            <div className='LogIn-element Cornsilk-color'>
                                <label>Password:</label>
                                <input className='LogIn-input-element' required 
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                />
                            </div>
                            <br />
                            <button className='btn LogIn-button Button-text' type='submit'>Log In</button>
                            <Link className='btn LogIn-home-button Button-text Center-text' to={{pathname: '/home'}}> 
                                Home
                            </Link>
                        </div>
                    </form>
                </div>
            </header>
        </div> 
    )
}

export default LogIn