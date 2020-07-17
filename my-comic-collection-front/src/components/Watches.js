import { useState } from 'react' // https://reactjs.org/docs/hooks-overview.html
import _ from 'lodash'  // https://underscorejs.org/)
import WatchDetail from '../containers/WatchDetail'
import WatchList from './WatchList'
import SidebarMobile from './SidebarMobile'
// The following comment is required for @emotion to work
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // https://github.com/emotion-js/emotion

const Watches = ({ watches, watchRelated, sortOptionSelected, isSearchSuccessful, DashBoardHistory }) => {
 
    let oldestWatch
    let newestWatch
    let filteredWatches
    let filteredWatchRelated

    if(watches?.length > 0) {
        // Filter out watch-related records
        filteredWatchRelated = watches.filter(watch => watch.watch_maker.includes(watchRelated))
        // Filter out watch records
        filteredWatches = watches.filter(watch => !watch.watch_maker.includes(watchRelated))
        // Sort the filtered watch records by date bought using the underscore function _.sortBy
        const sortedWatches = _.sortBy( filteredWatches, 'date_bought' )
        oldestWatch = sortedWatches[0]
        newestWatch = sortedWatches[sortedWatches.length-1] 
        
    }    

   const [showWatches, setShowWatches] = useState(false) // used when in a mobile view
                                                         // to toggle watch list on and off   

   const [currentWatch, setCurrentWatch] = useState(null) 

    return (
        <div className='Sidebar-list-detail-container'>
            <div className='Watches-Sidebar-list-detail' css={css`
                
                @media (max-width: 600px) {
                    grid-template-areas: 'sidebar-mobile ${showWatches ? 'sidebar-desktop' : 'main'}';
                    grid-template-columns: 80px auto;
                }
            `}>
                <SidebarMobile  showWatches={showWatches}   
                                setShowWatches={setShowWatches}
                    />
                <WatchList showWatches={showWatches}
                           setShowWatches={setShowWatches}
                           watches={watches}
                           setCurrentWatch={setCurrentWatch}
                /> 
                <WatchDetail currentWatch={currentWatch}
                             setCurrentWatch={setCurrentWatch}
                             newestWatch={newestWatch}
                             oldestWatch={oldestWatch}
                             filteredWatches={filteredWatches}
                             filteredWatchRelated={filteredWatchRelated}
                             sortOptionSelected={sortOptionSelected}
                             isSearchSuccessful={isSearchSuccessful}
                             DashBoardHistory={DashBoardHistory}
                />

            </div>
        </div>
    )
}

export default Watches