import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { hashHistory } from 'react-router' // Used to change URL without a re-render
// The following comment is required for @emotion to work
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // https://github.com/emotion-js/emotion'
import { resetSortAction } from '../actions/comicsActions'

const ComicList = (props) => { 

    const dispatch = useDispatch()

    return (
        <div>
            <div className='Comic-list' css={css`
                
                @media (max-width: 600px) {
                    display: ${props.showComics ? 'block' : 'none'};
                    width: 400px;
                }
            `}>
                <ul className='List' css={css`
                    list-style: none;
                `}>
                    {props.comics ? 
                        props.comics.map(comic => {
                            return <li className='Comic-publisher-and-name' key={comic.id} 
                                onClick={() => { 
                                    dispatch(resetSortAction())
                                    hashHistory.push(`/comics/${comic.id}/comic_detail`) // set the url for the comic
                                    props.setCurrentComic(comic)
                                    props.setShowComics(false) // on mobiles will allow toggling of comic list
                                }}>
                                <b className='Comic-publisher Dark-red-color'>
                                    {comic.comic_publisher}:</b> {comic.comic_name}
                            </li>
                        })
                    : null}
                </ul>  
            </div> 
            <div className='ComicList-buttons' css={css`
            
                @media (max-width: 600px) { {
                    display: ${props.showComics ? 'block' : 'none'};
                    max-width: 400px;
                }
            `}>   
                <Link to={{pathname: '/comics/add_comic_related',
                        isAddComicRelated: true
                        }}>
                    <button className='btn Add-comic-related-button Button-text' >Add Comic-Related</button>
                </Link>
                <Link to={{pathname: '/comics/add_comic'}}>
                    <button className='btn Add-comic-button Button-text' >Add Comic</button>
                </Link>
                <Link to={{pathname: '/comic_related_info'}}>
                    <button className='btn Comich-related-info-button Button-text' >Comic-Related Info</button>
                </Link>
            </div>
        </div>
    )
}

export default ComicList