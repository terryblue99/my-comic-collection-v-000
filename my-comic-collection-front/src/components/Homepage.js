import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import logo from '../images/logo.jpg'

const Homepage = () => {
    
    return (
        <div>    
            <header className='Homepage'>
                <div>
                    <h2 className='Homepage-title Cornsilk-color'>Catalog and view your watch collection</h2>
                </div>
                <img src={logo} alt='logo' className='Logo'/>
                <div className='Homepage-container'>
                    <>
                        <Link className='btn Home-button Button-text Center-text' to={{
                            pathname: `/login`
                        }}
                        > Log In
                        </Link>
                        
                        <Link className='btn Home-button Button-text Center-text' to={{
                            pathname: `/signup`
                        }}
                        > Sign Up
                        </Link>
                    </>
                </div>
            </header>
        </div>
    )
}

export default Homepage