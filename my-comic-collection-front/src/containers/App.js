import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import LogIn from './auth/LogIn'
import LogOut from './auth/LogOut'
import SignUp from './auth/SignUp'
import Homepage from '../components/Homepage'
import ComicRelatedInfo from '../components/ComicRelatedInfo'
import DashBoard from './DashBoard'
import AddComic from './AddComic'
import ComicDetail from './ComicDetail'
import EditComic from './EditComic'
import EditProfile from './EditProfile'
import { Redirect } from 'react-router-dom'

const App = () => {

  const user = useSelector(state => state.currentUser)

  let a_user_exists
  let is_logged_in
  
  if (user) {
    a_user_exists = user
    is_logged_in = user.logged_in
  }

  const handleRedirect = () => {
    return  <Redirect to={{
      pathname: '/home'
    }}  />
  }

  const PrivateRoute = ({ component: Component, ...rest}) => ( // rename component with a capital 'C'
                                                                // ...rest is rest of arguments; path & component
    <div> 
      <Route {...rest} render={(props) => (
        a_user_exists && is_logged_in
        ? <Component {...props} /> 
        : handleRedirect()
      )}/>
    </div> 
  )

  return (
    
    <div className='App'>
      <Router>
        <Switch>
            <Route exact path='/home' component={Homepage} />
            <Route path='/login' component={LogIn} />
            <Route path='/logout' component={LogOut} />
            <Route path='/signup' component={SignUp} />
            {/* The following routes are only accessible from within the app as a logged in user */}
            {/* Any attempt to access them, other than within the app, will be redirected to the home page */}
            <PrivateRoute path='/dashboard' component={DashBoard} />
            <PrivateRoute path='/comics/add_comic' component={AddComic} />
            <PrivateRoute path='/comics/add_comic_related' component={AddComic} />
            <PrivateRoute path='/comics/:id/comic_detail' component={ComicDetail} />
            <PrivateRoute path='/comics/:id/edit_comic' component={EditComic} />
            <PrivateRoute path='/comics/:id/edit_comic_related' component={EditComic} />
            <PrivateRoute path='/edit_profile' component={EditProfile} />
            <PrivateRoute path='/comic_related_info' component={ComicRelatedInfo} />
            {/* the following catchall route will redirect unknown routes to the home page */}
            <PrivateRoute from='*' />
        </Switch> 
      </Router>
    </div>
  )
}

export default App