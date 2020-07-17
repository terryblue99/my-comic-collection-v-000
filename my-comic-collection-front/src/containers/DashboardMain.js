import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { hashHistory } from 'react-router' // Used to change URL without a re-render
import logo from '../images/logo.jpg'
import { sortWatchesAction, resetWatchesAction, resetSearchFailedAction, resetSortAction } from '../actions/watchesActions'
import RedirectToWithState from "../components/RedirectToWithState"

const DashboardMain = (props) => {

  const [stateData, setStateData] = useState({isSortRequired: false, sortOptionSelected: ''})
  const savedWatches = useSelector(state => state.myWatches.savedWatches)
  const watchRelated = useSelector(state => state.myWatches.watchRelated) // For records that are not related to a specific watch.
  const sortDefaultText = useSelector(state => state.myWatches.sortDefaultText)
  const isSearchFailed = useSelector(state => state.myWatches.isSearchFailed)
  const dispatch = useDispatch()

  const handleSelectedSortKey = (event) =>  {
    event.preventDefault()
    const {value} = event.target
    dispatch(sortWatchesAction(value))
    setStateData(prevStateData => {
      return {
        ...prevStateData,
        isSortRequired: true,
        sortOptionSelected: value
      }
    })
  }

  let a_newest_watch_exists
  let newestWatchImage
  let newestWatchMaker
  let newestWatchDate

  let an_oldest_watch_exists
  let oldestWatchImage
  let oldestWatchMaker
  let oldestWatchDate

  let number_of_watches = 0
  let number_of_watcheRelated = 0

  const number_of_saved_watches = Object.keys(savedWatches).length
  const sortElement = [
    <>
      <h2 className='Center-text'>Sort By</h2>
      <br />
      <select id='Select-sort'
              required
              size='1' 
              name='sort' 
              onChange={handleSelectedSortKey}>
        <option>{props.sortOptionSelected}</option>
        <option value='Watch Maker'>Watch Maker</option>
        <option value='Watch Name'>Watch Name</option>
        <option value='Newest to Oldest'>Newest to Oldest</option>
        <option value='Oldest to Newest'>Oldest to Newest</option>
        <option value='Cost Low to High'>Cost Low to High</option>
        <option value='Cost High to Low'>Cost High to Low</option>
      </select>
    </>
  ]


  if (props.sortOptionSelected && props.sortOptionSelected === sortDefaultText ) {
      if (document.getElementById('Select-sort') !== null) {
            // Reset sort option to the default
            document.getElementById('Select-sort').options[0].selected = true
      }
  }

  const welcome = [
    <>
      <h2 className="Welcome-text-header Center-text">Welcome</h2>
      <p className="Welcome-text Center-text"><b>Please click on the ADD WATCH button</b></p>
      <p className="Welcome-text Center-text"><b>to start cataloging your watches</b></p>
    </>
  ]

  if (props.newestWatch && props.oldestWatch) {

      a_newest_watch_exists = !props.newestWatch.watch_maker.includes(watchRelated)
      newestWatchImage = props.newestWatch.image 
      newestWatchMaker = props.newestWatch.watch_maker
      newestWatchDate = props.newestWatch.date_bought

      an_oldest_watch_exists = !props.oldestWatch.watch_maker.includes(watchRelated)
      oldestWatchImage = props.oldestWatch.image
      oldestWatchMaker = props.oldestWatch.watch_maker
      oldestWatchDate = props.oldestWatch.date_bought

      number_of_watches = Object.keys(props.filteredWatches).length
  }

  if (props.filteredWatchRelated) {
      number_of_watcheRelated = Object.keys(props.filteredWatchRelated).length
  }

  if (stateData.isSortRequired) {
      setStateData(prevStateData => {
        return {
          ...prevStateData,
          isSortRequired: false
        }
      })  
      // Display the sorted list on the dashboard
      return  RedirectToWithState(
                                    '/dashboard',
                                    {
                                      isFromDashboardMain: true,
                                      sortOptionSelected: stateData.sortOptionSelected
                                    } 
                                  )
  }

  if (isSearchFailed) {
    // Clear the current detail screen to allow 
    // the dashboard to be displayed there instead
    props.setCurrentWatch(null)

    dispatch(resetSearchFailedAction())
  }
  
  return (

    <div className='DashboardMain'>

      <div className='Dashboard-item Dashboard-initialList'>
        { number_of_saved_watches > 1
          ? <>
              <button className='btn FullList-button Button-text' 
                // Fetch all records and delete the DashBoard history location state
                // so that the initial sort option text can be displayed
                onClick={() => {  dispatch(resetWatchesAction())
                                  if (props.DashBoardHistory && props.DashBoardHistory.location.state) {
                                        delete props.DashBoardHistory.location.state                                                                               
                                  }             
                }               
              }> 
                Redisplay Initial List
              </button>
            </>
          : null
        }
        <br />
        { number_of_watches > 0
            ? <p className='Dashboard-totalWatches Center-text'>Total watches: <span className='Watch-total'>{number_of_watches}</span></p>
            : null
        }
        { number_of_watcheRelated > 0
            ? <p className='Dashboard-totalWatchRelated Center-text'>Total watch-related: <span className='Watch-related-total'>{number_of_watcheRelated}</span></p>
            : null
        }   
      </div>
      <div className='Dashboard-item Dashboard-sort'> 
        <h1 className='Dashboard-header Dark-red-color Center-text'>Dashboard</h1>
        { number_of_watches > 1 
            && an_oldest_watch_exists
            && a_newest_watch_exists
          ? sortElement
          : null
        }
        { number_of_watches === 0 && number_of_saved_watches === 0
          ? welcome
          : null
        }
      </div>
      { number_of_watches !== 0 && number_of_saved_watches !== 0
          ? <div className='Dashboard-item'>
              <iframe className='Dashboard-time' 
                      title='clockFrame' 
                      src="http://free.timeanddate.com/clock/i6z3es2b/n2036/szw110/szh110/hoc9b8578/hbw10/hfc754c29/cf100/hnc432f30/hcw2/fav0/fiv0/mqcfff/mqs4/mql25/mqw12/mqd78/mhcfff/mhs2/mhl5/mhw2/mhd78/mmv0/hwm1/hhcfff/hhs2/hhl50/hhw8/hmcfff/hms2/hml70/hmw8/hmr4/hscfff/hss3/hsl70/hsw3" 
                      frameBorder="0" 
                      width="110" 
                      height="110">
              </iframe>
            </div>
          : null
      }
      <div className='Dashboard-item Dashboard-newestWatch Dashboard-watch-image'>
        {number_of_watches > 1 && a_newest_watch_exists
          ? <>
              <h2 className='Dashboard-watchText Newest-watch Center-text'>Newest Watch</h2>
              <h3 className='Dashboard-watchText-new Center-text'>{newestWatchMaker}</h3>
              <h4 className='Dashboard-watchText-new Center-text'>{newestWatchDate}</h4>
            </>
          : null
        }
        {number_of_watches === 1 && a_newest_watch_exists
          ? <>
              <h3 className='Dashboard-watchText-new Center-text'>{newestWatchMaker}</h3>
              <h4 className='Dashboard-watchText-new Center-text'>{newestWatchDate}</h4>
            </>
          : null
        }
        {number_of_watches > 0 && a_newest_watch_exists
          ? <span className='Image-link' 
                  onClick={() => { 
                    dispatch(resetSortAction())
                    hashHistory.push(`/watches/${props.newestWatch.id}/watch_detail`) // set the url for the watch
                    props.setCurrentWatch(props.newestWatch)
                  }}>
                  <img src={newestWatchImage} alt='newest watch' className='Watch-image Dashboard-watch-image'/>
            </span>
          : null
        }
        <br />
      </div>
      {number_of_watches !== 0 && number_of_saved_watches !== 0
        ? <div className='Dashboard-item Dashboard-logo'>
            <img src={logo} alt='logo' />
          </div>
        : null
      }
        
      <br />
      <div className='Dashboard-item Dashboard-oldestWatch Dashboard-watch-image'>
        {number_of_watches > 1 && an_oldest_watch_exists
          ? <>
              <h2 className='Dashboard-watchText Oldest-watch Center-text'>Oldest Watch</h2>
              <h3 className='Dashboard-watchText-old Center-text'>{oldestWatchMaker}</h3>
              <h4 className='Dashboard-watchText-old Center-text'>{oldestWatchDate}</h4>
            </>
          : null
        }
        {number_of_watches === 1 && an_oldest_watch_exists
          ? <>
              <h3 className='Dashboard-watchText-old Center-text'>{oldestWatchMaker}</h3>
              <h4 className='Dashboard-watchText-old Center-text'>{oldestWatchDate}</h4>
            </>
          : null
        }
        {number_of_watches > 0 && an_oldest_watch_exists
          ? <span className='Image-link' 
                onClick={() => { 
                  dispatch(resetSortAction())
                  hashHistory.push(`/watches/${props.oldestWatch.id}/watch_detail`) // set the url for the watch
                  props.setCurrentWatch(props.oldestWatch)
                }}>
              <img src={oldestWatchImage} alt='oldest watch' className='Watch-image Dashboard-watch-image'/>
            </span>
          : null
        }

      </div>       
    </div>
  )
}

export default DashboardMain