import _ from 'lodash'
import {
	CLEAR_COMICS,
	COST_HIGH_TO_LOW_SORT,
	COST_LOW_TO_HIGH_SORT,
	SOLD_FOR_HIGH_TO_LOW_SORT,
	SOLD_FOR_LOW_TO_HIGH_SORT,
	FMV_LOW_TO_HIGH_SORT,
  FMV_HIGH_TO_LOW_SORT,
	DELETE_COMIC,
	GET_COMICS, 
	NEWEST_TO_OLDEST_SORT,
	OLDEST_TO_NEWEST_SORT,
	RESET_TOTAL_COST,
	RESET_TOTAL_SOLD_FOR,
	RESET_TOTAL_SOLD,
	RESET_SEARCH_FAILED,
	RESET_SORT,
	RESET_COMICS,
	SEARCH_COMICS,
	COMIC_PUBLISHER_SORT,
	COMIC_NAME_SORT,
	COMIC_RELATED,
	COMICS_SOLD
} from '../actions/types'

const initialState = {
	comics: [],
	savedComics: [],
	savedComicRelated: [],
	savedComicsSold: [],
	comicRelated: 'Comic-Related', // For records that are not related to a specific comic.
	sortDefaultText: 'Select a sort option for comics...',
	totalCost: parseFloat(0),
	totalSoldFor: parseFloat(0),
	totalSold: parseFloat(0),
	savedTotalCost: parseFloat(0),
	savedTotalSoldFor: parseFloat(0),
	savedTotalSold: parseFloat(0),
	isSearchResultRelated: false,
	isSearchFailed: false,
	isSort: false,
	isComicRelatedDisplayed: false,
	isComicSoldDisplayed: false
}
let sortedComics

// Used when sorting comics by cost,
// converting it to a floating point number
const costToNumber = (comic) => {
	if (comic.cost) {
		return parseFloat(comic.cost)
	} else return 0.00
}
// Used when sorting comics by sold_for,
// converting it to a floating point number
const soldForToNumber = (comic) => {
	if (comic.sold_for) {
		return parseFloat(comic.sold_for)
	} else return 0.00
}
// Used when sorting comics by fmv,
// converting it to a floating point number
const fmvToNumber = (comic) => {
	if (comic.fmv) {
		return parseFloat(comic.fmv)
	} else return 0.00
}

export default (state = initialState, { type, payload } ) => {

	switch(type) {

		// UPDATE COMICS & COMIC-RELATED

		case GET_COMICS:			
			if (payload) {
				const comicsData = payload.sortedComicData.filter(comic => comic.comic_publisher !== state.comicRelated)
				const relatedData = payload.sortedComicData.filter(comic => comic.comic_publisher === state.comicRelated)
				const comicsSoldData = payload.sortedComicData.filter(comic => comic.sold_for > 0)
				return ({
					...state,
					ComicRelated: state.ComicRelated,
					isSearchResultRelated: false,
					isSearchFailed: false,
					comics: comicsData,
					savedComics: comicsData,
					savedComicRelated: relatedData,
					savedComicsSold: comicsSoldData,
					totalCost: payload.totalCost,
					savedTotalCost: payload.totalCost,
					totalSoldFor: payload.totalSoldFor,
					savedTotalSoldFor: payload.totalSoldFor,
					totalSold: payload.totalSold,
					savedTotalSold: payload.totalSold
				})
			} else return state

		case RESET_COMICS:		
			return ({
				...state,
				comics: state.savedComics,
				totalCost: state.savedTotalCost,
				totalSoldFor: state.savedTotalSoldFor,
				totalSold: state.savedTotalSold,
				isSearchResultRelated: false,
				isComicRelatedDisplayed: false,
				isComicSoldDisplayed: false
			})

		case COMIC_RELATED:		
			return ({
				...state,
				comics: state.savedComicRelated,
				isSearchResultRelated: false,
				isComicSoldDisplayed: false,
				isComicRelatedDisplayed: true
			})

		case COMICS_SOLD:		
			return ({
				...state,
				comics: state.savedComicsSold,
				isSearchResultRelated: false,
				isComicRelatedDisplayed: false,
				isComicSoldDisplayed: true
			})

		case RESET_TOTAL_COST:		
			return ({
				...state,
				comics: state.savedComics,
				totalCost: parseFloat(0)
			})

		case RESET_TOTAL_SOLD_FOR:		
			return ({
				...state,
				comics: state.savedComics,
				totalSoldFor: parseFloat(0)
			})
		
		case RESET_TOTAL_SOLD:		
			return ({
				...state,
				comics: state.savedComics,
				totalSold: parseFloat(0)
			})

		case RESET_SEARCH_FAILED:
			return ({
				...state,
				isSearchFailed: false
			})

		case DELETE_COMIC:
			if (payload) {
				return ({
					...state,
					comics: state.comics.filter(comic => comic.id !== payload),
					savedComics: state.savedComics.filter(comic => comic.id !== payload),
					savedComicRelated: state.savedComicRelated.filter(comic => comic.id !== payload)
				})
			} else return state		

		case CLEAR_COMICS:
				state = initialState
				return ({
					...state,
					totalCost: parseFloat(0),
					totalSoldFor: parseFloat(0),
					totalSold: parseFloat(0),
				})

		// SEARCH COMICS & COMIC-RELATED

		case SEARCH_COMICS:
			if (payload === null) {
				alert('Please enter a search value!')
				return ({
					...state,
					comics: state.savedComics,
					totalCost: state.savedTotalCost,
					totalSoldFor: state.savedTotalSoldFor,
					totalSold: state.savedTotalSold
				})
			}

			let comicArray
			let searchText

			if (payload !== null) {
				searchText = payload.toLowerCase()
			}

			let comicsSearchData
			let relatedFound = false
			if (state.savedComicRelated.length === 0) {
				comicsSearchData = state.savedComics
			} else {
				comicsSearchData = state.savedComics.concat(state.savedComicRelated)
			}

			const searchArray = comicsSearchData.filter(comic => {
				comicArray = []
				comicArray.push( comic.comic_name.toLowerCase(),
													comic.comic_publisher.toLowerCase(),
													comic.comic_number.toLowerCase(),
													comic.comic_title.toLowerCase(),
													comic.date_published,
													comic.cost,
													comic.sold_for,
													comic.fmv,
													comic.notes.toLowerCase()
												)
				// check array of record string fields for searchText string/substring								
				return comicArray.some(comicStringField => comicStringField.includes(searchText))
			})

			// Accumulate the total cost of all comics
			const totalCost = searchArray.reduce((total, cost, index, array) => {
				total += parseFloat(array[index].cost)
				return total
			}, 0)

			// Accumulate the Sold For total of all comics
			const totalSoldFor = searchArray.reduce((total, sold_for, index, array) => {
				total += parseFloat(array[index].sold_for)
				return total
			}, 0)

			// Calculate the total number of comics sold
			const totalSold = searchArray.filter(e => e.sold_for > 0).length;

			if (searchArray.some(item => item.comic_publisher === state.comicRelated)) {
				relatedFound = state.comicRelated
			}

			return ({
				...state,
				comics: searchArray,
				totalCost: totalCost,
				totalSoldFor: totalSoldFor,
				totalSold: totalSold,
				isSearchResultRelated: relatedFound
			})
		
		// SORT COMICS & COMIC-RELATED

		case COMIC_PUBLISHER_SORT: // sort by name within publisher
			sortedComics = _.chain( state.comics )
			.sortBy('comic_name')
			.sortBy('comic_publisher')
			.value()
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})
	
		case COMIC_NAME_SORT:
			sortedComics = _.sortBy( state.comics, 'comic_name' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	NEWEST_TO_OLDEST_SORT:
			sortedComics = _.sortBy( state.comics, 'date_published' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics.reverse()
			})

		case	OLDEST_TO_NEWEST_SORT:
			sortedComics = _.sortBy( state.comics, 'date_published' )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	COST_LOW_TO_HIGH_SORT:
			sortedComics = _.sortBy( state.comics, costToNumber )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})

		case	COST_HIGH_TO_LOW_SORT:
			sortedComics = _.sortBy( state.comics, costToNumber)
			return ({
				...state,
				isSort: true,
				comics: sortedComics.reverse()
			})

			case	SOLD_FOR_LOW_TO_HIGH_SORT:
				sortedComics = _.sortBy( state.comics, soldForToNumber )
				return ({
					...state,
					isSort: true,
					comics: sortedComics
				})
	
			case	SOLD_FOR_HIGH_TO_LOW_SORT:
				sortedComics = _.sortBy( state.comics, soldForToNumber)
				return ({
					...state,
					isSort: true,
					comics: sortedComics.reverse()
				})

		case	FMV_LOW_TO_HIGH_SORT:
			sortedComics = _.sortBy( state.comics, fmvToNumber )
			return ({
				...state,
				isSort: true,
				comics: sortedComics
			})
	
		case	FMV_HIGH_TO_LOW_SORT:
			sortedComics = _.sortBy( state.comics, fmvToNumber)
			return ({
				...state,
				isSort: true,
				comics: sortedComics.reverse()
			})
			
		case RESET_SORT:
			return ({
				...state,
				isSort: false
			})

		// DEFAULT STATE

		default:
			return state
	}
}