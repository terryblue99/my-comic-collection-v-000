import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { createHashHistory } from 'history' // Used to change URL without a re-render
import logo from '../images/Marvel_DC_logo.jpg'
import { sortComicsAction, resetComicsAction, 
         comicRelatedAction, resetSearchFailedAction, 
         resetSortAction } from '../actions/comicsActions'
import RedirectTo from "../components/RedirectToWithState"

const DashboardMain = (props) => {

  const hashHistory = createHashHistory() // Used to change URL without a re-render
  const [stateData, setStateData] = useState({isSortRequired: false, sortOptionSelected: ''})
  const Comics = useSelector(state => state.myComics.comics)
  const savedComics = useSelector(state => state.myComics.savedComics)
  const comicRelated = useSelector(state => state.myComics.comicRelated) // For records that are not related to a specific comic.
  const isComicRelatedDisplayed = useSelector(state => state.myComics.isComicRelatedDisplayed)
  const isSearchResultRelated = useSelector(state => state.myComics.isSearchResultRelated)
  const savedComicRelated = useSelector(state => state.myComics.savedComicRelated)
  const sortDefaultText = useSelector(state => state.myComics.sortDefaultText)
  const isSearchFailed = useSelector(state => state.myComics.isSearchFailed)
  const totalCost = useSelector(state => state.myComics.totalCost)
  const dispatch = useDispatch()

  const handleSelectedSortKey = (event) =>  {
    event.preventDefault()
    const {value} = event.target
    dispatch(sortComicsAction(value))
    setStateData(prevStateData => {
      return {
        ...prevStateData,
        isSortRequired: true,
        sortOptionSelected: value
      }
    })
  }

  let a_newest_comic_exists
  let newestComicImage
  let newestComicPublisher
  let newestComicDate

  let an_oldest_comic_exists
  let oldestComicImage
  let oldestComicPublisher
  let oldestComicDate

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
        <option value='Comic Publisher'>Comic Publisher</option>
        <option value='Comic Name'>Comic Name</option>
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
      <p className="Welcome-text Center-text"><b>Please click on the ADD COMIC button</b></p>
      <p className="Welcome-text Center-text"><b>to start cataloging your comics</b></p>
    </>
  ]

  if (props.newestComic && props.oldestComic) {

      a_newest_comic_exists = !props.newestComic.comic_publisher.includes(comicRelated)
      newestComicImage = props.newestComic.image 
      newestComicPublisher = props.newestComic.comic_publisher
      newestComicDate = props.newestComic.date_published

      an_oldest_comic_exists = !props.oldestComic.comic_publisher.includes(comicRelated)
      oldestComicImage = props.oldestComic.image
      oldestComicPublisher = props.oldestComic.comic_publisher
      oldestComicDate = props.oldestComic.date_published
  }

  let [number_of_comics, number_search_result] = Array(2).fill(Object.keys(Comics).length)
  const number_of_saved_comics = Object.keys(savedComics).length
  const number_of_comicRelated = Object.keys(savedComicRelated).length

  if (stateData.isSortRequired) {
      setStateData(prevStateData => {
        return {
          ...prevStateData,
          isSortRequired: false
        }
      })  
      // Display the sorted list on the dashboard
      return  RedirectTo('/dashboard')
  }

  if (isSearchFailed) {
    // Clear the current detail screen to allow 
    // the dashboard to be displayed there instead
    props.setCurrentComic(null)

    dispatch(resetSearchFailedAction())
  }
  
  return (

    <div className='DashboardMain'>

      <div className='Dashboard-item Dashboard-initialList'>
        { number_of_saved_comics > 0
          ? <>
              <button className='btn FullList-button Button-text' 
                // Fetch all comic records and delete the DashBoard history location state
                // so that the initial sort option text can be displayed
                onClick={() => {  dispatch(resetComicsAction())
                                  if (props.DashBoardHistory && props.DashBoardHistory.location.state) {
                                        delete props.DashBoardHistory.location.state                                                                               
                                  }             
                }               
              }> 
                Display All Comics
              </button>
            </>
          : null
        }
        <br />
        { number_of_comics > 0 && !isComicRelatedDisplayed && !isSearchResultRelated
            ? <p className='Dashboard-totalComics Center-text'>Total Comics: <span className='Comic-total'>{number_of_comics}</span></p>
            : null
        }
        { number_of_comics > 0 && !isComicRelatedDisplayed && isSearchResultRelated
            ? <p className='Dashboard-totalComics Center-text'>Search results: <span className='Comic-total'>{number_search_result}</span></p>
            : null
        }
        { number_of_comics > 0 && totalCost > 0 && !isComicRelatedDisplayed
            ?  <p className='Dashboard-totalComics Center-text'>
                Total Cost: <span className='Comic-total'>
                              {parseFloat(totalCost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                            </span>
              </p>
            : null
        }
        { number_of_comicRelated > 0 && number_of_comics > 0
          ? <>
              <button className='btn FullList-button Button-text' 
                // Fetch all comic related records and delete the DashBoard history location state
                // so that the initial sort option text can be displayed
                onClick={() => {  dispatch(comicRelatedAction())
                                  if (props.DashBoardHistory && props.DashBoardHistory.location.state) {
                                        delete props.DashBoardHistory.location.state                                                                               
                                  }             
                }               
              }> 
                Display Comic Related
              </button>
            </>
          : null
        }
        <br />
        { number_of_comicRelated > 0 && number_of_comics > 0
          ? <p className='Dashboard-totalComicRelated Center-text'>Total Comic Related: <span className='Comic-related-total'>{number_of_comicRelated}</span></p>
          : null
        } 
      </div>
      <div className='Dashboard-item Dashboard-sort'> 
        <h1 className='Dashboard-header Dark-red-color Center-text'>Dashboard</h1>
        { number_of_comics > 1 
            && an_oldest_comic_exists
            && a_newest_comic_exists
          ? sortElement
          : null
        }
        { number_of_saved_comics === 0
          ? welcome
          : null
        }
      </div>
      { number_of_comics !== 0
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
      <div className='Dashboard-item Dashboard-newestComic Dashboard-comic-image'>
        {number_of_comics > 1 && a_newest_comic_exists
          ? <>
              <h2 className='Dashboard-comicText Newest-comic Center-text'>Newest Comic</h2>
              <h3 className='Dashboard-comicText-new Center-text'>{newestComicPublisher}</h3>
              <h4 className='Dashboard-comicText-new Center-text'>{newestComicDate}</h4>
            </>
          : null
        }
        {number_of_comics === 1 && a_newest_comic_exists
          ? <>
              <h3 className='Dashboard-comicText-new Center-text'>{newestComicPublisher}</h3>
              <h4 className='Dashboard-comicText-new Center-text'>{newestComicDate}</h4>
            </>
          : null
        }
        {number_of_comics > 0 && a_newest_comic_exists
          ? <span className='Image-link' 
                  onClick={() => { 
                    dispatch(resetSortAction())
                    hashHistory.push(`/comics/${props.newestComic.id}/comic_detail`) // set the url for the comic
                    props.setCurrentComic(props.newestComic)
                  }}>
                  <img src={newestComicImage} alt='newest comic' className='Comic-image Dashboard-comic-image'/>
            </span>
          : null
        }
        <br />
      </div>
      {number_of_comics !== 0 
        ? <div className='Dashboard-item Dashboard-logo'>
            <img src={logo} alt='logo' />
          </div>
        : null
      }
        
      <br />
      <div className='Dashboard-item Dashboard-oldestComic Dashboard-comic-image'>
        {number_of_comics > 1 && an_oldest_comic_exists
          ? <>
              <h2 className='Dashboard-comicText Oldest-comic Center-text'>Oldest Comic</h2>
              <h3 className='Dashboard-comicText-old Center-text'>{oldestComicPublisher}</h3>
              <h4 className='Dashboard-comicText-old Center-text'>{oldestComicDate}</h4>
            </>
          : null
        }
        {number_of_comics === 1 && an_oldest_comic_exists
          ? <>
              <h3 className='Dashboard-comicText-old Center-text'>{oldestComicPublisher}</h3>
              <h4 className='Dashboard-comicText-old Center-text'>{oldestComicDate}</h4>
            </>
          : null
        }
        {number_of_comics > 0 && an_oldest_comic_exists
          ? <span className='Image-link' 
                onClick={() => { 
                  dispatch(resetSortAction())
                  hashHistory.push(`/comics/${props.oldestComic.id}/comic_detail`) // set the url for the comic
                  props.setCurrentComic(props.oldestComic)
                }}>
              <img src={oldestComicImage} alt='oldest comic' className='Comic-image Dashboard-comic-image'/>
            </span>
          : null
        }

      </div>       
    </div>
  )
}

export default DashboardMain