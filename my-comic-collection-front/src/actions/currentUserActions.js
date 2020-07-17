import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  CLEAR_WATCHES,
  DELETE_USER
} from './types'

const API_URL = '/api/v4'

export const logInAction = (credentials) => {
  return dispatch => {
    return fetch(`${API_URL}/sessions`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (response.error) {
            alert('*** logInAction Error 1: ' + response.error.message)
        } else {
          return response.json()
        }
      })
      .then(response => {
        if (!response.error) {
          if (response.status === 401) {
            alert('Account not found, please retry or Sign Up!')
            window.location.assign('/home')
          } else {
            dispatch({
              type: SET_CURRENT_USER,
              payload: response
            })
            return
          }   
        } else {
          alert('*** logInAction Error 2: ' + response.error.message) 
        }
      })
      .catch(error => {
        console.log('logInAction Error 3: ', error)
      })
  }
}

export const signUpAction = (credentials) => {
  return dispatch => {
    return fetch(`${API_URL}/registrations`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (response.error) {
          if (response.status === 500) {
            alert('Account not created, please retry!')
          } else {
            alert('*** signUpAction Error 1: ' + response.error.message)
          }
        } else {
          return response.json()
        }
      })
      .then(response => {
        if (!response.error) {
          dispatch({
            type: SET_CURRENT_USER,
            payload: response
          })
          return
        } else {
          alert('Email has already been taken, please retry!') 
        }
      })
      .catch(error => {
        console.log('*** signUpAction Error 2: ', error)
      })
  }
}

export const logOutAction = () => {
  return dispatch => {
    return fetch(`${API_URL}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
    .then(dispatch({type: CLEAR_CURRENT_USER}))
    .then(dispatch({type: CLEAR_WATCHES}))
    .catch(error => {
      console.log('*** logOutAction Error: ', error)
    })
  }
}

export const editProfileAction = (formData, user_id) => {
  return dispatch => {
    return fetch(`${API_URL}/update/${user_id}`, {
      method: 'PATCH',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      if (!response.error) {
        if (response.status === 401) {
          alert('Account not found, please retry!')
          return
        } else {
            dispatch({
              type: SET_CURRENT_USER,
              payload: response
            })
        }
      } else {
        alert('*** editProfileAction Error 1: ' + response.error.message) 
      }
    })
    .catch(error => {
      console.log('*** editProfileAction Error 2: ' + error.message)
    })
  }
}

export const deleteUserAction = (user_id) => {
	return dispatch => {
		return fetch(`${API_URL}/registrations/${user_id}`, {
				method: 'DELETE'
		})
		.then(response => {
			if (response.error) {
				alert('*** deleteUserAction ERROR 1: ' + response.error.message)
			} else {
				dispatch({
					type: DELETE_USER
        })
        alert('Your account has been successfully deleted!')
        window.location.assign('/home') 
			}
		})
		.catch(error => {
			console.log('*** deleteUserAction ERROR 2: ' + error.message)
		})
	}
}