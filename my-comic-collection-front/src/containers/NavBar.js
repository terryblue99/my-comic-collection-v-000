import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { searchComicsAction } from '../actions/comicsActions'
import ClearForm from '../components/ClearForm'
import RedirectTo from '../components/RedirectToWithState'

const NavBar = () => {

  const [searchData, setSearchData] = useState({isSearchRequested: false, searchText: null})
  const currentUser = useSelector(state => state.currentUser)
  const comics = useSelector(state => state.myComics.comics)
  const savedComics = useSelector(state => state.myComics.savedComics)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const {value} = event.target
    setSearchData(prevSearchData => {
        return {
          ...prevSearchData,
          searchText: value
        }
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    dispatch(searchComicsAction(searchData.searchText))
    setSearchData(prevSearchData => {
      return {
        ...prevSearchData,
        isSearchRequested: true
      }
    })
  }
    
  if (searchData.isSearchRequested &&
      comics.length > 0) {
        setSearchData(prevSearchData => {
          return {
            ...prevSearchData,
            isSearchRequested: false,
            searchText: null
          }
        }) 
      // Clear the form
      ClearForm('Nav-search-form')
      // Display list from the search on the dashboard
      return  RedirectTo('/dashboard')
      
  } else if (searchData.isSearchRequested &&
             comics.length === 0) 
              {
                setSearchData(prevSearchData => {
                  return {
                    ...prevSearchData,
                    isSearchRequested: false,
                    searchText: null
                  }
                })
                // Clear the form
                ClearForm('Nav-search-form')

                if (savedComics.length > 0) {
                  alert('Search not found. Please correct and try again!')
                } else {
                  alert('There is nothing to search on!')
                }  
                // Display original list on the dashboard
                return  RedirectTo('/dashboard')
              }

  return (
    
    <div className='Nav-header'>

      <div className='Nav-container'>   

        <div className='Nav-logo Gold-color' to='/dashboard'>
          My Comic Collection
        </div>
      
        <nav className='Nav'>

          <div className='Nav-links'> 
            {currentUser.logged_in} {
              <>
                <div  className='Nav-logged_in-as'>
                  Logged in as: {currentUser.user.email}
                </div>
                <NavLink  className='Nav-log_out-link Cornsilk-color' to='/logout'> 
                  Log Out   
                </NavLink>
                <NavLink  className='Nav-link Nav-edit-profile-link Cornsilk-color' to='/edit_profile'
                          onClick={() => {NavLink.className=' active'}}>
                  Edit Profile   
                </NavLink>
              </>
            }
          </div>
        </nav>

        <form id='Nav-search-form'
          onSubmit={handleSearch}
        >
          <input className='Nav-search-input Center-text'
            type='text'
            name='comic_search'
            placeholder='Search My Comic Collection'
            onInput={handleChange}
          /> 
          <button className='Search-button Button-text' type='submit'><b>Search</b></button> 
        </form>
      </div>
      
    </div>   
  
    )
}

export default NavBar