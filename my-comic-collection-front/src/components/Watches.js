import { useState } from 'react' // https://reactjs.org/docs/hooks-overview.html
import _ from 'lodash'  // https://underscorejs.org/)
import WatchDetail from '../containers/WatchDetail'
import WatchList from './WatchList'
import SidebarMobile from './SidebarMobile'
// The following comment is required for @emotion to work
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // https://github.com/emotion-js/emotion

const Comics = ({ comics, watchRelated, sortOptionSelected, isSearchSuccessful, DashBoardHistory }) => {
 
    let oldestWatch
    let newestWatch
    let filteredComics
    let filteredWatchRelated

    if(comics?.length > 0) {
        // Filter out watch-related records
        filteredWatchRelated = comics.filter(watch => watch.watch_maker.includes(watchRelated))
        // Filter out watch records
        filteredComics = comics.filter(watch => !watch.watch_maker.includes(watchRelated))
        // Sort the filtered watch records by date bought using the underscore function _.sortBy
        const sortedComics = _.sortBy( filteredComics, 'date_bought' )
        oldestWatch = sortedComics[0]
        newestWatch = sortedComics[sortedComics.length-1] 
        
    }    

   const [showComics, setShowComics] = useState(false) // used when in a mobile view
                                                         // to toggle watch list on and off   

   const [currentWatch, setCurrentWatch] = useState(null) 

    return (
        <div className='Sidebar-list-detail-container'>
            <div className='Comics-Sidebar-list-detail' css={css`
                
                @media (max-width: 600px) {
                    grid-template-areas: 'sidebar-mobile ${showComics ? 'sidebar-desktop' : 'main'}';
                    grid-template-columns: 80px auto;
                }
            `}>
                <SidebarMobile  showComics={showComics}   
                                setShowComics={setShowComics}
                    />
                <WatchList showComics={showComics}
                           setShowComics={setShowComics}
                           comics={comics}
                           setCurrentWatch={setCurrentWatch}
                /> 
                <WatchDetail currentWatch={currentWatch}
                             setCurrentWatch={setCurrentWatch}
                             newestWatch={newestWatch}
                             oldestWatch={oldestWatch}
                             filteredComics={filteredComics}
                             filteredWatchRelated={filteredWatchRelated}
                             sortOptionSelected={sortOptionSelected}
                             isSearchSuccessful={isSearchSuccessful}
                             DashBoardHistory={DashBoardHistory}
                />

            </div>
        </div>
    )
}

export default Comics