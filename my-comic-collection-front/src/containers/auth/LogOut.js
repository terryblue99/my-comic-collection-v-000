import React from 'react'
import { useDispatch } from 'react-redux'
import { logOutAction } from "../../actions/currentUserActions.js"
import { Redirect } from 'react-router-dom'

const LogOut = () => {
  const dispatch = useDispatch()
  dispatch(logOutAction())
  return  <Redirect to={{
    pathname: '/home'
  }}  />
}

export default LogOut