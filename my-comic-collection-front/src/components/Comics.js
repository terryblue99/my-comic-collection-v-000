import { useSelector } from 'react-redux'
import { useState } from 'react' // https://reactjs.org/docs/hooks-overview.html
import _ from 'lodash'  // https://underscorejs.org/)
import ComicDetail from '../containers/ComicDetail'
import ComicList from './ComicList'
import SidebarMobile from './SidebarMobile'
// The following comments are required for @emotion to work
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // https://github.com/emotion-js/emotion

const Comics = ({ comics, sortOptionSelected, DashBoardHistory }) => {
 
    let oldestComic
    let newestComic

    const comicRelated = useSelector(state => state.myComics.comicRelated) // For records that are not related to a specific comic.

    if(comics?.length > 0) {
        // Filter out records that are not watch related
        const filteredComics = comics.filter(comic => comic.comic_publisher !== comicRelated)
        // Sort the filtered comic records by date bought using the underscore function _.sortBy
        const sortedComics = _.sortBy( filteredComics, 'date_published' )
        // Extract the oldest and newest comics
        oldestComic = sortedComics[0]
        newestComic = sortedComics[sortedComics.length-1]
    }    

    const [showComics, setShowComics] = useState(false) // used when in a mobile view
                                                       // to toggle comic list on and off
    const [currentComic, setCurrentComic] = useState(null) 

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
                <ComicList showComics={showComics}
                           setShowComics={setShowComics}
                           comics={comics}
                           setCurrentComic={setCurrentComic}
                /> 
                <ComicDetail currentComic={currentComic}
                             setCurrentComic={setCurrentComic}
                             newestComic={newestComic}
                             oldestComic={oldestComic}
                             sortOptionSelected={sortOptionSelected}
                             DashBoardHistory={DashBoardHistory}
                />

            </div>
        </div>
    )
}

export default Comics