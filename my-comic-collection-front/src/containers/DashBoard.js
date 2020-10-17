import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getComicsAction } from '../actions/comicsActions'
import NavBar from './NavBar'
import Comics from '../components/Comics'

const DashBoard = (props) => {

    const currentUser = useSelector(state => state.currentUser)
    const comics = useSelector(state => state.myComics.comics)
    const comicRelated = useSelector(state => state.myComics.comicRelated)
    const sortDefaultText = useSelector(state => state.myComics.sortDefaultText)
    const dispatch = useDispatch()
    let sortOptionSelected = sortDefaultText
    
    useEffect(() => {
        dispatch(getComicsAction(currentUser.user.id))    
    },[dispatch, currentUser.user.id])

    // Check if redirected from another screen
    if (props.location.state) {
        // Check if redirected to from ComicDetail and a record has been edited
        if (props.location.state.isFromComicDetail &&
                    props.location.state.isEdits) {
                    dispatch(getComicsAction(currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete props.history.location.state   
                }
        // Check if redirected to from ComicDetail and a record has been deleted
        else if (props.location.state.isFromComicDetail &&
                    props.location.state.isComicDeleted) {
                    dispatch(getComicsAction(currentUser.user.id))
                    // Delete the history location state to prevent re-execution of this code
                    delete props.history.location.state   
        }
    }
    
    return (

        <div>
            <NavBar />
            <div className='container Main-container'>
                <Comics comics={comics}
                         comicRelated={comicRelated}
                         sortOptionSelected={sortOptionSelected}
                         DashBoardHistory={props.history}
                />               
            </div> 
        </div>
        )
}

export default DashBoard