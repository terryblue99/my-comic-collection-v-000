import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComicAction } from '../actions/comicsActions'
import DashboardMain from './DashboardMain'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from '../components/RedirectToWithState'

const ComicDetail = (props) => { 

    const [stateData, setStateData] = useState({isBackToDashboard: false, isComicDeleted: false})
    const isSort = useSelector(state => state.myComics.isSort)
    const comicRelated = useSelector(state => state.myComics.comicRelated) // For records that are not related to a specific comic.
    const isSearchFailed = useSelector(state => state.myComics.isSearchFailed)
    const dispatch = useDispatch()

    const handleDelete = () => {

        let isComicRelated
        let recordType

        if (props.currentComic.comic_publisher === comicRelated) {
            isComicRelated = true
            recordType = comicRelated
        } else {
                isComicRelated = false
                recordType = 'comic'
               }

        if (window.confirm(`Do you realy want to delete this ${recordType}?`)) {

            dispatch(deleteComicAction(props.currentComic.id))
            
            if (!isComicRelated) {
                alert('The comic has been deleted!')
            } else alert(`The ${comicRelated} has been deleted!`)

            setStateData(prevStateData => {
                return {
                    ...prevStateData,
                    isBackToDashboard: true,
                    isComicDeleted: true
                }
            })
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

    if (stateData.isBackToDashboard && stateData.isComicDeleted) {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: false,
                isComicDeleted: false
            }
        })
        // Clear the current detail screen to allow 
        // the dashboard to be displayed there instead
        props.setCurrentComic(null)
        return  RedirectToWithState(
                                        '/dashboard',
                                        {
                                            isFromComicDetail: true,    
                                            isComicDeleted: true
                                        } 
                                    )
    } 
    else if (stateData.isBackToDashboard) {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: false
            }
        }) 
        // Clear the current detail screen to allow 
        // the dashboard to be displayed there instead
        props.setCurrentComic(null) 
        RedirectTo('/dashboard')
    }

    const {currentComic} = props
    
    if (currentComic && 
        !props.isSearchSuccessful && 
        !isSearchFailed &&
        !isSort) 
    {
        const {
            id,
            comic_name,
            comic_publisher,
            movement,
            complications,
            band,
            model_number,
            case_measurement,
            water_resistance,
            date_bought,
            cost,
            notes
        } = currentComic

        return ( 
            
            <div className='Comic-detail'>
                <div className='Back-button_and_Image'>    
                    <button onClick={handleBack} className='Comic-detail-back-button btn Button-text'>Back to dashboard</button>
                    <div className='Comic-detail-image'> 
                        <img src={currentComic.image} alt='current comic' className='Comic-image'/>
                    </div>
                </div>
                <div className='Comic-detail-text'>
                    <h1 className='ComicDetail-comich-publisher Dark-red-color'><b>{comic_publisher}</b></h1> 
                    <h2 className='Comic-name'>{comic_name}</h2>
                    <div className='Comic-detail-complications Center-text'>
                        {movement && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Movement</p>
                                    <h3 className='ComicDetail'>{movement}</h3>
                                </>
                            :   null }
                        {movement && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{movement}</h3>
                                </>
                            :   null }
                        {complications && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Complications</p>
                                    <h3 className='ComicDetail'>{complications}</h3>
                                </>
                            :   null }
                        {complications && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{complications}</h3>
                                </>
                            :   null }
                        {band && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Band</p>
                                    <h3 className='ComicDetail'>{band}</h3>
                                </>
                            :   null }
                        {band && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{band}</h3>
                                </>
                            :   null }
                        {model_number && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Model Number</p>
                                    <h3 className='ComicDetail'>{model_number}</h3>
                                </>
                            :   null }
                        {model_number && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{model_number}</h3>
                                </>
                            :   null }
                        {case_measurement && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Case Measurement</p>
                                    <h3 className='ComicDetail'>{case_measurement}</h3>
                                </>
                            :   null }
                        {case_measurement && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{case_measurement}</h3>
                                </>
                            :   null }
                        {water_resistance && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Water Resistance</p>
                                    <h3 className='ComicDetail'>{water_resistance}</h3>
                                </>
                            :   null }
                        {water_resistance && comic_publisher.includes(comicRelated) 
                            ?   <>  <h3 className='ComicDetail'>{water_resistance}</h3>
                                </>
                            :   null }
                        {date_bought && !comic_publisher.includes(comicRelated) 
                        ?   <>
                                {cost > 0
                                    ? <> <p className='Detail-css'>Date Bought</p>
                                        <h3 className='ComicDetail'>{date_bought}</h3>
                                    </>
                                    : <> <p className='Detail-css'>Date RCVD</p>
                                        <h3 className='ComicDetail'>{date_bought}</h3>
                                    </>
                                }    
                            </>
                        : null }
                        {cost > 0
                        ?    <>
                                <p className='Detail-css'>Cost</p>
                                <h3 className='ComicDetail'>{parseFloat(cost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                            </>
                        : null }
                        {notes 
                        ?    <>
                                <p className='Detail-css'>Notes</p>
                                <h3 className='ComicDetail'>{notes}</h3>
                            </>
                        : null }
                    </div> 
                    <div className="Edit-Delete-buttons">
                        {!comic_publisher.includes(comicRelated)
                            ? <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/comics/${id}/edit_comic`,
                                        state: {
                                            comic: currentComic
                                        }
                                    }}>
                                        Edit
                                </Link>
                            </>
                            : <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/comics/${id}/edit_comic_related`,
                                        state: {
                                            comic: currentComic,
                                            isEditComicRelated: true
                                        }
                                    }}>
                                        Edit
                                </Link>
                            </>
                        }
                        <button className='btn Delete-button Button-text Center-text' onClick={handleDelete}> 
                            Delete
                        </button>
                    </div>    
                </div>
            </div> 
        )     
    } else {
    
        return <DashboardMain   newestComic={props.newestComic}
                                oldestComic={props.oldestComic}
                                setCurrentComic={props.setCurrentComic}
                                filteredComics={props.filteredComics}
                                filteredComicRelated={props.filteredComicRelated}
                                sortOptionSelected={props.sortOptionSelected}
                                DashBoardHistory={props.DashBoardHistory}              
        />
    }
}

export default ComicDetail