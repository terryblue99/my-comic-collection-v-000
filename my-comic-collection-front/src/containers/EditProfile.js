import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { editProfileAction } from '../actions/currentUserActions'
import { deleteUserAction } from '../actions/currentUserActions'
import { trackPromise } from 'react-promise-tracker' // Tracks deleteUserAction, displaying processing spinner
                                                     // https://lemoncode.github.io/react-promise-tracker/
import ProcessingIndicator from '../components/ProcessingIndicator' // https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
import RedirectTo from '../components/RedirectTo'

const EditProfile = () => {
     
     const currentUser = useSelector(state => state.currentUser)
     const [stateData, setStateData] = useState({
          id: currentUser.user.id,  
          email: currentUser.user.email,
          password: '',
          password_confirmation: '',

          isBackToDashboard: false,
          isFormInput: false,
          isProcessing: false
     })
     const dispatch = useDispatch()

     const {
          id,
          email,
          password,
          password_confirmation
     } = stateData

     const handleDelete = () => {
          if (window.confirm('Do you really want to delete your account?\nAll of your watches will also be deleted!')) {
               setStateData(prevStateData => {
                    return {
                         ...prevStateData,
                         isProcessing: true
                    }
               })
               trackPromise (
                    dispatch(deleteUserAction(stateData.id))
               )             
          }
      }

     const handleChange = (event) => {
          const {name, value} = event.target
          if(event.target.name === 'password' && event.target.value === '')
               setStateData(prevStateData => {
                    return {
                         ...prevStateData,
                         isFormInput: false
                    }
               })
          else setStateData(prevStateData => {
               return {
                    ...prevStateData,
                    [name]: value,
                    isFormInput: true
               }
          })                           
     }

     const handleSubmit = (event) => {
          event.preventDefault()
          
          if (stateData.isFormInput) {

               if (password && password.length < 8 ) {
                    alert('Password must be a minimum of 8 characters!')
                    return
               }

               if (password && password !== password_confirmation) {
                    alert('New Password and New Password Confirmation must be the same!')
                    return
               }

               if (window.confirm('Do you really want to update your profile?')) {
                    // Edit the profile
                    const formData = new FormData()
                    formData.append('email', email)
                    formData.append('password', password)
                    formData.append('password_confirmation', password_confirmation)
                    dispatch(editProfileAction(formData, id))
                    alert('Your profile has been updated.\nYou will need to log in again.')
                    window.location.assign('/login')
               }    
          }  else {
               alert('Nothing has been edited!')
          }  
     }

     const handleBack = () => {
          setStateData(prevStateData => {
               return {
                    ...prevStateData,
                    isBackToDashboard: true
               }
          })
     }
     
     if (stateData.isBackToDashboard) {
          RedirectTo('/dashboard')
     }
     
     return (  
          
          <div>
               <NavBar />
               <div className='container Profile-container'>
                    <div className='Profile-form-container'>
                         <button onClick={handleBack} className='btn Back-button Button-text'>Back to dashboard</button>   
                         <form id='EditProfile-Form'
                                   onSubmit={handleSubmit}
                         >
                              <h1 className='ProfileForm-header Dark-red-color Center-text'>
                                   Edit Profile
                              </h1>
                              <h2 className='ProfileForm-subheader Center-text'>
                                   (You can change your email and/or password here)
                              </h2>
                              <div className='Profile'>
                                   <label>Email</label>
                                   <input className='Input-element'
                                             type='email'
                                             name='email'
                                             defaultValue={email}
                                             onChange={handleChange}
                                   />
                                   <br /> 
                                   <label>New Password (<span className='ProfileForm-NewPassword-text Dark-red-color'>Leave blank for no change</span>)</label>
                                   <input className='Input-element' 
                                             type='password'
                                             name='password'
                                             onChange={handleChange}
                                   />
                                   <br />
                                   <label>New Password Confirmation</label>
                                   <input className='Input-element' 
                                             type='password'
                                             name='password_confirmation'
                                             onChange={handleChange}
                                   />
                                   <br />
                                   <button className='btn ProfileUpdate-button Button-text' type='submit'>Update Profile</button>
                                   <br />
                                   <br />
                              </div>
                         </form>
                    </div>
                    <hr className='ProfileDelete-hr' />
                    <div className='ProfileDelete'> 
                         {stateData.isProcessing ? <ProcessingIndicator /> :
                              <button className='btn ProfileDelete-button Button-text' onClick={handleDelete}> 
                                   Delete My Account
                              </button>}
                    </div>
               </div>
          </div>
     )
}

export default EditProfile