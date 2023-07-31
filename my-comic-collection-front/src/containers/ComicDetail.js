import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Image from 'react-image-enlarger'
import { deleteComicAction } from '../actions/comicsActions'
import DashboardMain from './DashboardMain'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from '../components/RedirectToWithState'

const ComicDetail = (props) => { 

    const [stateData, setStateData] = useState({isBackToDashboard: false, isComicDeleted: false})
    const [zoomed, setZoomed] = React.useState(false)
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

        if (window.confirm(`Do you really want to delete this ${recordType}?`)) {

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

    const enlargeImage = (image) => {
        return (
            <Image
                style={{ width: '200px', height: 'auto' }}
                zoomed={zoomed}
                src={image}
                alt='comic image'
                onClick={() => setZoomed(true)}
                onRequestClose={() => setZoomed(false)}
            />
        )
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
        !isSearchFailed &&
        !isSort) 
    {
        const {
            id,
            comic_publisher,
            comic_name,
            comic_number,
            comic_title,
            date_published,
            cost,
            sold_for,
            net_payout,
            date_sold,
            payout_date,
            sale_venue,
            fmv,
            notes
        } = currentComic

        const {
            comic_publisher: comic_related,
            comic_name: related_title,
            comic_number: related_input1,
            comic_title: related_input2,
            date_published: related_input3,
            date_sold: related_input4,
            payout_date: related_input5,
            sale_venue: related_input6

        } = currentComic
        
        return ( 
            
            <div className='Comic-detail'>
                <div className='Back-button_and_Image'>    
                    <button onClick={handleBack} className='Comic-detail-back-button btn Button-text'>Back to dashboard</button>
                    <div className='Comic-detail-image'> 
                        {enlargeImage(currentComic.image)}
                    </div>
                </div>
                <div className='Comic-detail-text'>
                    {comic_publisher && !comic_related.includes(comicRelated)
                        ? <h1 className='ComicDetail-comic-publisher Dark-red-color'><b>{comic_publisher}</b></h1>
                        : <h1 className='ComicDetail-comic-related Dark-red-color'><b>{comic_related}</b></h1> 
                    }
                    {comic_name && !comic_related.includes(comicRelated)
                        ? <h2 className='Comic-name'>{comic_name}</h2>
                        : <h2 className='Related-title'>{related_title}</h2> 
                    }
                    <div className='Comic-detail-complications Center-text'>
                        {comic_number && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Comic Number</p>
                                    <h3 className='ComicDetail'>{comic_number}</h3>
                                </>
                            :   null }
                        {related_input1 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input1}</h3>
                            :   null }
                        {comic_title && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Comic Title</p>
                                    <h3 className='ComicDetail'>{comic_title}</h3>
                                </>
                            :   null }
                        {related_input2 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input2}</h3>
                            :   null }
                        {date_published && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Date Published</p>
                                    <h3 className='ComicDetail'>{date_published}</h3>
                                </>
                            :   null }
                        {related_input3 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input3}</h3>
                            :   null }
                        { cost > 0
                            ?   <>  <p className='Detail-css'>Cost</p>
                                    <h3 className='ComicDetail'>{parseFloat(cost).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                                </>
                            : null }
                        { sold_for > 0
                            ?   <>  <p className='Detail-css'>Sold For</p>
                                    <h3 className='ComicDetail'>{parseFloat(sold_for).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                                </>
                            : null }
                        { net_payout > 0
                            ?   <>  <p className='Detail-css'>Net Payout</p>
                                    <h3 className='ComicDetail'>{parseFloat(net_payout).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                                </>
                            : null }
                        {date_sold && !comic_publisher.includes(comicRelated)  && date_sold !== ''
                            ?   <>  <p className='Detail-css'>Date Sold</p>
                                    <h3 className='ComicDetail'>{date_sold}</h3>
                                </>
                            :   null }
                        {related_input4 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input4}</h3>
                            :   null }
                        {payout_date && !comic_publisher.includes(comicRelated) && payout_date !== ''
                            ?   <>  <p className='Detail-css'>Payout Date</p>
                                    <h3 className='ComicDetail'>{payout_date}</h3>
                                </>
                            :   null }
                        {related_input5 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input5}</h3>
                            :   null }
                        {sale_venue && !comic_publisher.includes(comicRelated)
                            ?   <>  <p className='Detail-css'>Sale Venue</p>
                                    <h3 className='ComicDetail'>{sale_venue}</h3>
                                </>
                            :   null }
                        {related_input6 !== 'undefined' && comic_related.includes(comicRelated) 
                            ?   <h3 className='ComicDetail'>{related_input6}</h3>
                            :   null } 
                        {fmv > 0
                            ?   <>  <p className='Detail-css'>Fair Market Value (FMV) Low</p>
                                    <h3 className='ComicDetail'>{parseFloat(fmv).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h3>
                                </>
                            : null }   
                        {notes 
                            ?   <>  <p className='Detail-css'>Notes</p>
                                    <h3 className='TextDetail'>{notes}</h3>
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