import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { hashHistory } from 'react-router' // Used to change URL without a re-render
// The following comment is required for @emotion to work
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // https://github.com/emotion-js/emotion'
import { resetSortAction } from '../actions/watchesActions'

const WatchList = (props) => { 

    const dispatch = useDispatch()

    return (
        <div>
            <div className='Watch-list' css={css`
                
                @media (max-width: 600px) {
                    display: ${props.showWatches ? 'block' : 'none'};
                    width: 400px;
                }
            `}>
                <ul className='List' css={css`
                    list-style: none;
                `}>
                    {props.watches ? 
                        props.watches.map(watch => {
                            return <li className='Watch-maker-and-name' key={watch.id} 
                                onClick={() => { 
                                    dispatch(resetSortAction())
                                    hashHistory.push(`/watches/${watch.id}/watch_detail`) // set the url for the watch
                                    props.setCurrentWatch(watch)
                                    props.setShowWatches(false) // on mobiles will allow toggling of watch list
                                }}>
                                <b className='Watch-maker Dark-red-color'>
                                    {watch.watch_maker}:</b> {watch.watch_name} 
                            </li>
                        })
                    : null}
                </ul>  
            </div> 
            <div className='WatchList-buttons' css={css`
            
                @media (max-width: 600px) { {
                    display: ${props.showWatches ? 'block' : 'none'};
                    max-width: 400px;
                }
            `}>   
                <Link to={{pathname: '/watches/add_watch_related',
                        isAddWatchRelated: true
                        }}>
                    <button className='btn Add-watch-related-button Button-text' >Add Watch-Related</button>
                </Link>
                <Link to={{pathname: '/watches/add_watch'}}>
                    <button className='btn Add-watch-button Button-text' >Add Watch</button>
                </Link>
                <Link to={{pathname: '/watch_related_info'}}>
                    <button className='btn Watch-related-info-button Button-text' >Watch-Related Info</button>
                </Link>
            </div>
        </div>
    )
}

export default WatchList