import { 
  SET_CURRENT_USER, 
  CLEAR_CURRENT_USER,
  DELETE_USER
 } 
from '../actions/types'

export default (state = null, { type, payload }) => {

  switch (type) { 

    case SET_CURRENT_USER:
      if (payload) {     
        return payload
      } else return state

    case CLEAR_CURRENT_USER:
      return null

    case DELETE_USER:
      return null
      
    default:
      return state
  }
}