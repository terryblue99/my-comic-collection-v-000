import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteWatchAction } from '../actions/comicsActions'
import DashboardMain from './DashboardMain'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from '../components/RedirectToWithState'

const WatchDetail = (props) => { 

    const [stateData, setStateData] = useState({isBackToDashboard: false, isWatchDeleted: false})
    const isSort = useSelector(state => state.myComics.isSort)
    const watchRelated = useSelector(state => state.myComics.watchRelated) // For records that are not related to a specific watch.
    const isSearchFailed = useSelector(state => state.myComics.isSearchFailed)
    const dispatch = useDispatch()

    const handleDelete = () => {

        let isWatchRelated
        let recordType

        if (props.currentWatch.watch_maker === watchRelated) {
            isWatchRelated = true
            recordType = watchRelated
        } else {
                isWatchRelated = false
                recordType = 'watch'
               }

        if (window.confirm(`Do you realy want to delete this ${recordType}?`)) {

            dispatch(deleteWatchAction(props.currentWatch.id))
            
            if (!isWatchRelated) {
                alert('The watch has been deleted!')
            } else alert(`The ${watchRelated} has been deleted!`)

            setStateData(prevStateData => {
                return {
                    ...prevStateData,
                    isBackToDashboard: true,
                    isWatchDeleted: true
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

    if (stateData.isBackToDashboard && stateData.isWatchDeleted) {
        setStateData(prevStateData => {
            return {
                ...prevStateData,
                isBackToDashboard: false,
                isWatchDeleted: false
            }
        })
        // Clear the current detail screen to allow 
        // the dashboard to be displayed there instead
        props.setCurrentWatch(null)
        return  RedirectToWithState(
                                        '/dashboard',
                                        {
                                            isFromWatchDetail: true,    
                                            isWatchDeleted: true
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
        props.setCurrentWatch(null) 
        RedirectTo('/dashboard')
    }

    const {currentWatch} = props
    
    if (currentWatch && 
        !props.isSearchSuccessful && 
        !isSearchFailed &&
        !isSort) 
    {
        const {
            id,
            watch_name,
            watch_maker,
            movement,
            complications,
            band,
            model_number,
            case_measurement,
            water_resistance,
            date_bought,
            cost,
            notes
        } = currentWatch

        return ( 
            
            <div className='Watch-detail'>
                <div className='Back-button_and_Image'>    
                    <button onClick={handleBack} className='Watch-detail-back-button btn Button-text'>Back to dashboard</button>
                    <div className='Watch-detail-image'> 
                        <img src={currentWatch.image} alt='current watch' className='Watch-image'/>
                    </div>
                </div>
                <div className='Watch-detail-text'>
                    <h1 className='WatchDetail-watch-maker Dark-red-color'><b>{watch_maker}</b></h1> 
                    <h2 className='Watch-name'>{watch_name}</h2>
                    <div className='Watch-detail-complications Center-text'>
                        {movement && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Movement</p>
                                    <h3 className='WatchDetail'>{movement}</h3>
                                </>
                            :   null }
                        {movement && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{movement}</h3>
                                </>
                            :   null }
                        {complications && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Complications</p>
                                    <h3 className='WatchDetail'>{complications}</h3>
                                </>
                            :   null }
                        {complications && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{complications}</h3>
                                </>
                            :   null }
                        {band && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Band</p>
                                    <h3 className='WatchDetail'>{band}</h3>
                                </>
                            :   null }
                        {band && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{band}</h3>
                                </>
                            :   null }
                        {model_number && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Model Number</p>
                                    <h3 className='WatchDetail'>{model_number}</h3>
                                </>
                            :   null }
                        {model_number && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{model_number}</h3>
                                </>
                            :   null }
                        {case_measurement && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Case Measurement</p>
                                    <h3 className='WatchDetail'>{case_measurement}</h3>
                                </>
                            :   null }
                        {case_measurement && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{case_measurement}</h3>
                                </>
                            :   null }
                        {water_resistance && !watch_maker.includes(watchRelated)
                            ?   <>  <p className='Detail-css'>Water Resistance</p>
                                    <h3 className='WatchDetail'>{water_resistance}</h3>
                                </>
                            :   null }
                        {water_resistance && watch_maker.includes(watchRelated) 
                            ?   <>  <h3 className='WatchDetail'>{water_resistance}</h3>
                                </>
                            :   null }
                        {date_bought && !watch_maker.includes(watchRelated) 
                        ?   <>
                                {cost > 0
                                    ? <> <p className='Detail-css'>Date Bought</p>
                                        <h3 className='WatchDetail'>{date_bought}</h3>
                                    </>
                                    : <> <p className='Detail-css'>Date RCVD</p>
                                        <h3 className='WatchDetail'>{date_bought}</h3>
                                    </>
                                }    
                            </>
                        : null }
                        {cost > 0
                        ?    <>
                                <p className='Detail-css'>Cost</p>
                                <h3 className='WatchDetail'>{parseFloat(cost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                            </>
                        : null }
                        {notes 
                        ?    <>
                                <p className='Detail-css'>Notes</p>
                                <h3 className='WatchDetail'>{notes}</h3>
                            </>
                        : null }
                    </div> 
                    <div className="Edit-Delete-buttons">
                        {!watch_maker.includes(watchRelated)
                            ? <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/comics/${id}/edit_watch`,
                                        state: {
                                            watch: currentWatch
                                        }
                                    }}>
                                        Edit
                                </Link>
                            </>
                            : <>
                                <Link className='btn Edit-button Button-text Center-text' to={{
                                        pathname: `/comics/${id}/edit_watch_related`,
                                        state: {
                                            watch: currentWatch,
                                            isEditWatchRelated: true
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
    
        return <DashboardMain   newestWatch={props.newestWatch}
                                oldestWatch={props.oldestWatch}
                                setCurrentWatch={props.setCurrentWatch}
                                filteredComics={props.filteredComics}
                                filteredWatchRelated={props.filteredWatchRelated}
                                sortOptionSelected={props.sortOptionSelected}
                                DashBoardHistory={props.DashBoardHistory}              
        />
    }
}

export default WatchDetail